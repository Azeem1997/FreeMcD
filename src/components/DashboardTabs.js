import TransactionsTable from "./TransactionTable";
import MonthlyRewardsTable from "./MonthlyRewardsTable";
import TotalRewardsTable from "./TotalRewardsTable";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from "react";

/**
 * TabPanel - Renders content for a specific tab
 * 
 * Only displays content when the tab is active (value === index).
 * Provides accessibility attributes for screen readers.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to display when tab is active
 * @param {number} props.value - Current active tab index
 * @param {number} props.index - This tab's index
 * @returns {React.ReactElement} The tab panel container
 */
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

/**
 * Generates accessibility properties for tab elements
 * 
 * Creates id and aria-controls attributes for tab elements to ensure
 * proper screen reader support and accessibility.
 * 
 * @function
 * @param {number} index - The tab index
 * @returns {Object} Object with id and aria-controls properties
 */
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

/**
 * DashboardTabs - Tabbed interface for viewing different reward data
 * 
 * Provides three main tabs:
 * 1. Transactions - View all individual transactions with reward calculations
 * 2. Monthly Rewards - Aggregated rewards by customer and month
 * 3. Total Rewards - Total accumulated rewards per customer
 * 
 * Manages tab switching state and passes relevant data to child table components.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array<Object>} props.transactions - Array of transaction objects
 * @param {Array<Object>} props.rewards - Array of monthly reward objects
 * @param {Array<Object>} props.totals - Array of total reward objects per customer
 * @param {boolean} props.loading - Loading state indicator
 * @returns {React.ReactElement} Tabbed interface with data tables
 */
export default function DashboardTabs({ transactions, rewards, totals, loading }) {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary "
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Transactions" {...a11yProps(0)} />
          <Tab label="Monthly Rewards" {...a11yProps(1)} />
          <Tab label="Total Rewards" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <TransactionsTable transactions={transactions} loading={loading} />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <MonthlyRewardsTable rewards={rewards} loading={loading} />
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <TotalRewardsTable totals={totals} loading={loading} />
      </TabPanel>
    </Box>
  );
}

