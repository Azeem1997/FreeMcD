import Dashboard from "./components/Dashboard";

/**
 * App - Main root component for the Rewards Program application
 * 
 * This is the top-level component that serves as the entry point for the React application.
 * It renders the main Dashboard component wrapped in a container div.
 * 
 * @component
 * @returns {React.ReactElement} The main application JSX with the Dashboard component
 */
export default function App() {

  return (
    <div className="container">
      <Dashboard />
    </div>
  );
}
