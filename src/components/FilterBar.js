import { useState } from "react";
import { Grid, TextField, Button, Typography, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

/**
 * FilterBar - Provides filter controls for transaction data
 * 
 * Allows users to filter transactions by:
 * - Customer name (text search)
 * - Product name (text search)
 * - Date range (from and to dates)
 * 
 * Provides Search and Reset buttons to apply or clear filters.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onFilter - Callback invoked when Search is clicked with filter values
 * @param {Function} props.onReset - Callback invoked when Reset is clicked
 * @returns {React.ReactElement} Filter UI with input fields and action buttons
 * 
 * @example
 * <FilterBar 
 *   onFilter={(filters) => setFilters(filters)}
 *   onReset={() => setFilters({})}
 * />
 */
const FilterBar = ({ onFilter, onReset }) => {
    const [filters, setFilters] = useState({
        name: "",
        product: "",
        fromDate: null,
        toDate: null,
    });

    /**
     * Updates a specific filter field
     * @param {string} field - The filter field name (name, product, fromDate, toDate)
     * @param {*} value - The new value for the field
     */
    const handleChange = (field, value) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
    };

    const handleSearch = () => {
        onFilter(filters);
    };

    const handleReset = () => {
        setFilters({
            name: "",
            product: "",
            fromDate: null,
            toDate: null,
        });
        onReset();
    };

    return (
       <Grid container spacing={3} className="filter-bar">
    <Grid item xs={12} size={12}>
        <Typography variant="h5" fontWeight="bold">
            Filter User Transactions
        </Typography>
    </Grid>
    <Grid item xs={12} size={4}>
        <TextField
            label="Customer Name"
            variant="outlined"
            fullWidth
            value={filters.name}
            onChange={(e) => handleChange("name", e.target.value)}
        />
    </Grid>
    <Grid item xs={12} size={4}>
        <DatePicker
            label="From Date"
            value={filters.fromDate}
            onChange={(newValue) => handleChange("fromDate", newValue)}
            slotProps={{ textField: { fullWidth: true } }}
        />
    </Grid>
    <Grid item xs={12} size={4}>
        <DatePicker
            label="To Date"
            value={filters.toDate}
            onChange={(newValue) => handleChange("toDate", newValue)}
            slotProps={{ textField: { fullWidth: true } }}
        />
    </Grid>

    <Grid item xs={12} size={12}>
        <Box display="flex" justifyContent="center" gap={2}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
            >
                Search
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                onClick={handleReset}
            >
                Reset
            </Button>
        </Box>
    </Grid>
</Grid>


    );
};

export default FilterBar;
