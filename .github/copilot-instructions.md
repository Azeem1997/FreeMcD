## Copilot / AI assistant instructions — rewards-program

Be brief and focused. This repository is a small Create React App that calculates customer reward points
from sample transaction JSON files served from `public/`.

Key places to read before editing code:
- `src/App.js` — app entry: fetches `public/mockData*.json` (via `axios.get('/<file>')`), validates transactions, and computes per-transaction reward points using `calculateRewardPoints`.
- `src/utils/calculatePoints.js` — central logic: `calculatePoints`, `calculateRewardPoints`, `aggregateMonthlyRewards`, `aggregateTotalRewards`. Prefer updating/adding tests here when changing behavior.
- `src/components/` — UI is split into `Tabs.jsx` (tab container), `TransactionTable.jsx`, `MonthlyRewardsTable.jsx`, `TotalRewardsTable.jsx` (presentational components using PascalCase props and `transactionId` as list key).
- `public/mockData*.json` — sample inputs. The app fetches these at runtime; don't assume they are imported as JS modules.

Project-specific patterns & expectations:
- Data fetching: App expects the JSON files to be available at root (`/mockData1.json` etc). Use `axios.get('/<filename>')` or the same relative fetch pattern.
- Date handling: code uses `new Date(tx.purchaseDate)` and `toLocaleString('default', { month: 'long' })` to build keys of the form `<customerId>-<Month>-<Year>`.
- Reward calculations: `calculateRewardPoints(amount)` returns 0 for <=50, `amount-50` for 51–100, and `2*(amount-100)+50` for >100. `calculatePoints` is used by aggregators and is floored to an integer — tests depend on this behavior.
- Tests: there is a unit test at `src/utils/calculatePoints.test.js` that asserts several numeric cases (120→90, 75→25, etc.). If you change rounding or thresholds, update the test accordingly.
- Styling: Bootstrap is imported globally in `src/index.js` (CSS + bundle JS). UI uses Bootstrap classes; prefer keeping markup consistent with existing class names.

Developer workflows (how to run):
- Start dev server: `npm start` (CRA default). The app serves `public/` files at `/` so mock JSON is fetched by the code above.
- Run tests once (non-interactive): in PowerShell use:
	```powershell
	$env:CI='true'; npm test -- --watchAll=false
	```
	(This runs the Jest suite in single-run CI mode; the interactive watch is the default otherwise.)

Changes and pull request guidance for AI edits:
- Keep logic and UI changes small and localized. Update or add unit tests under `src/` whenever you edit behavior in `src/utils`.
- Use existing prop names and component shapes. For example, `Tabs.jsx` passes `transactions`, `rewards`, and `totals` to child tables; preserve these shapes.
- When editing data-loading, prefer changing `public/mockData*.json` only for test or mock improvements. Don’t hardcode absolute paths — use the same pattern as `App.js`.

Examples to cite in PR descriptions:
- "Adjusted reward logic in `src/utils/calculatePoints.js` and updated `src/utils/calculatePoints.test.js` to keep behavior consistent (see 120 -> 90 case)."
- "Modified aggregation keys to use `customerId-month-year` consistent with `App.js` grouping logic."

If unsure, inspect these files first: `src/App.js`, `src/index.js`, `src/utils/calculatePoints.js`, `src/utils/calculatePoints.test.js`, and `src/components/Tabs.jsx`.

If you want more guidance or the project adds backend integration, ask for updated instructions that include auth, API schema, and environment variables.

— end of repo-specific Copilot instructions

