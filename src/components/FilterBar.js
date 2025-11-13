import { useState } from "react";
import { Grid, TextField, Button, Typography, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const FilterBar = ({ onFilter, onReset }) => {
    const [filters, setFilters] = useState({
        name: "",
        product: "",
        fromDate: null,
        toDate: null,
    });

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
