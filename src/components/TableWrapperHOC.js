import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Typography,
    Skeleton,
    TableSortLabel,
    TextField,
} from '@mui/material';
import '../styles/tableWrapper.scss';
import debounce from 'lodash.debounce';

const TableWrapper = ({ title, colorClass, columns, data, loading }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState({ field: null, direction: 'asc' });
    const [filters, setFilters] = useState({});
    const [localFilters, setLocalFilters] = useState({});

    const handleSort = (field) => {
        setSortConfig((prev) => ({
            field,
            direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    const updateFilters = useMemo(
        () =>
            debounce((updatedFilters) => {
                setFilters(updatedFilters);
            }, 500),
        []
    );

    const handleFilterChange = (field, value) => {
        const updatedLocal = { ...localFilters, [field]: value };
        setLocalFilters(updatedLocal);
        updateFilters(updatedLocal);
    };

    const filteredData = useMemo(() => {
        return data.filter((row) =>
            columns.every((col) => {
                const filterValue = filters[col.field];
                if (!filterValue) return true;

                const cellValue = row[col.field];
                if (cellValue === null || cellValue === undefined) return false;

                if (cellValue instanceof Date || (!isNaN(Date.parse(cellValue)) && typeof cellValue === 'string')) {
                    const dateString = new Date(cellValue).toLocaleDateString('en-US');
                    return dateString.includes(filterValue.trim());
                }

                if (typeof cellValue === 'number') {
                    return cellValue.toString().includes(filterValue.trim());
                }

                return String(cellValue).toLowerCase().includes(filterValue.toLowerCase().trim());
            })
        );
    }, [data, filters, columns]);


    const sortedData = useMemo(() => {
        if (!sortConfig.field) return filteredData;
        return [...filteredData].sort((a, b) => {
            const valA = a[sortConfig.field];
            const valB = b[sortConfig.field];
            if (valA === valB) return 0;
            if (sortConfig.direction === 'asc') {
                return valA > valB ? 1 : -1;
            }
            return valA < valB ? 1 : -1;
        });
    }, [filteredData, sortConfig]);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedData = useMemo(() => {
        return sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [sortedData, page, rowsPerPage]);
    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, data && data.length - page * rowsPerPage);

    return (
        <div>
            <Typography variant="h5" className={`table-title ${colorClass}`}>
                {title}
            </Typography>
            <Paper className="table-wrapper">
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow className="table-head-row">
                                {columns.map((col) => (
                                    <TableCell key={col.field}>
                                        <div className="table-header-cell">
                                            <TableSortLabel
                                                active={sortConfig.field === col.field}
                                                direction={sortConfig.field === col.field ? sortConfig.direction : 'asc'}
                                                onClick={() => handleSort(col.field)}
                                            >
                                                {col.headerName}
                                            </TableSortLabel>

                                            <TextField
                                                variant="standard"
                                                value={localFilters[col.field] || ''}
                                                onChange={(e) => handleFilterChange(col.field, e.target.value)}
                                                className="filter-input"
                                            />
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {loading ? (
                                Array.from({ length: 5 }).map((_, rowIdx) => (
                                    <TableRow key={rowIdx} className="skeleton-row">
                                        {columns.map((_, colIdx) => (
                                            <TableCell key={colIdx}>
                                                <Skeleton variant="text" height={28} className="skeleton-loader" />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : data && data.length > 0 ? (
                                paginatedData.map((row, i) => (
                                    <TableRow key={row._id ? row._id : i} className="table-row" hover>
                                        {columns.map((col) => (
                                            <TableCell key={col.field} align={col.align || 'left'}>
                                                {typeof col.render === 'function'
                                                    ? col.render(row)
                                                    : row[col.field]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns && columns.length} align="center" className="no-data">
                                        No data available.
                                    </TableCell>
                                </TableRow>
                            )}

                            {/* {emptyRows > 0 && !loading && (
                                <TableRow className="empty-row">
                                    <TableCell colSpan={columns && columns.length} />
                                </TableRow>
                            )} */}
                        </TableBody>
                    </Table>
                </TableContainer>

                {!loading && data && data.length > 0 && (
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={sortedData && sortedData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        className="table-pagination"
                    />
                )}
            </Paper>
        </div>
    );
};

TableWrapper.propTypes = {
    title: PropTypes.string.isRequired,
    colorClass: PropTypes.string,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            field: PropTypes.string.isRequired,
            headerName: PropTypes.string.isRequired,
            align: PropTypes.string,
            render: PropTypes.func,
        })
    ).isRequired,
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool,
};

export default TableWrapper;
