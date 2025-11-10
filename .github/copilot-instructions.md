## Quick orientation (what this repo is)

A React single-page app (Create React App) that visualizes a customer rewards program. Data is loaded from local JSON files in `public/` and processed client-side to compute reward points and aggregates.

Key entry points
- `src/App.js` — top-level data flow: fetch dataset from `/mockData*.json`, compute per-transaction reward points, build monthly and total aggregates, pass to `Tabs`.
- `src/utils/calculatePoints.js` — business logic for points and aggregation helpers. Tests import `calculatePoints` (`src/utils/calculatePoints.test.js`).
- `src/utils/aiHelper.js` — AI integration wrapper used by `src/components/AiAssistant.js`.
- `src/components/*` — UI tables and small helpers: `TransactionTable.jsx`, `MonthlyRewardsTable.jsx`, `TotalRewardsTable.jsx`, `AiAssistant.js`, `Tabs.jsx`.

How data flows (concrete example)
- Files in `public/mockData1.json` (and 2..5) are fetched via `axios.get('/mockData1.json')` in `App.js`.
- Each transaction object has these discoverable fields: `transactionId`, `customerId`, `customerName`, `purchaseDate`, `productPurchased`, `price`.
- `App.js` adds `rewardPoints` to each transaction using `calculateRewardPoints` and then reduces into two aggregates:
	- monthly by `customerId-month-year` (see `App.js` reduce logic)
	- total per customer (`totalRewards` array)

Developer workflows / commands
- Run dev server: `npm start` (CRA default, serves `public/` so mock JSON files are reachable at `/mockData*.json`).
- Run tests: `npm test` (tests use Jest via `react-scripts`).
- Build for production: `npm run build`.

Project-specific conventions and gotchas
- Two related functions exist in `src/utils/calculatePoints.js`: `calculatePoints` (used by tests and aggregators) and `calculateRewardPoints` (used in `App.js`). They follow slightly different rounding/behaviour — be careful when modifying the reward logic; update tests accordingly.
- Naming inconsistencies: monthly aggregation in `App.js` uses `points` while some utility functions use `rewardPoints` or `rewardPoints` properties. When changing shapes, update all consumers (`MonthlyRewardsTable.jsx`, `TotalRewardsTable.jsx`, `Tabs.jsx`).
- AI integration (security): `src/utils/aiHelper.js` constructs an OpenAI/HuggingFace client and reads `process.env.HF_API_TOKEN`. The client is created with `dangerouslyAllowBrowser: true`, which allows calls from the browser; expect that API keys must be injected at build time. Inspect `AiAssistant.js` for how prompts are constructed (it concatenates transactions into a single context string) — avoid sending very large datasets directly.

Integration points
- External libs: `axios`, `bootstrap`, `openai`, `@huggingface/inference` (see `package.json`).
- AI calls: `getAIResponse(prompt)` in `src/utils/aiHelper.js` and used by `src/components/AiAssistant.js`.

Common edits & examples
- Add a new dataset: drop `mockDataX.json` into `public/` and add an `<option value="mockDataX.json">` in `src/App.js` select list.
- Change the AI model: edit `model` in `src/utils/aiHelper.js` and ensure the required token is available at runtime.
- Update reward logic: prefer editing `src/utils/calculatePoints.js` and then update `App.js` to consume the canonical function; update `src/utils/calculatePoints.test.js` to lock behaviour.

Tests & lint
- Tests live next to utils (e.g., `src/utils/calculatePoints.test.js`) and are run via `npm test`.
- ESLint is configured in `package.json` and via CRA defaults; run `npm start` or your editor's linter integration to see warnings.

Where to look first for small tasks
- Bug: inconsistent field names between aggregators and tables — search for `rewardPoints` vs `points`.
- Performance: `AiAssistant` serializes all transactions into a single prompt string. For larger datasets, paginate or summarize before calling `getAIResponse`.

If anything above is unclear or you'd like me to change tone/length or include more examples (e.g., exact line numbers or a short migration patch to unify `rewardPoints` naming), tell me which parts to expand.
