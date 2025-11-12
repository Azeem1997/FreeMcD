import { useState } from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";
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
        <Grid container spacing={4} alignItems="center" className="filter-bar">
            <Typography variant="h5">
                Filters for User Transactions
            </Typography>
            <Grid item xs={12} sm={4}>
                <TextField
                    label="Customer Name"
                    variant="outlined"
                    fullWidth
                    value={filters.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                />
            </Grid>

            <Grid item xs={12} sm={3}>
                <DatePicker
                    label="From Date"
                    value={filters.fromDate}
                    onChange={(newValue) => handleChange("fromDate", newValue)}
                    slotProps={{ textField: { fullWidth: true } }}
                />
            </Grid>

            <Grid item xs={12} sm={3}>
                <DatePicker
                    label="To Date"
                    value={filters.toDate}
                    onChange={(newValue) => handleChange("toDate", newValue)}
                    slotProps={{ textField: { fullWidth: true } }}
                />
            </Grid>

            <Grid item xs={12} sm={2} className="filter-buttons" gap={2}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSearch}
                >
                    Search
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    onClick={handleReset}
                >
                    Reset
                </Button>
            </Grid>
        </Grid>
    );
};

export default FilterBar;
