import { useState } from 'react';

// ----------------------------------------------------------------------

export default function useTable(props) {
    const [orderBy, setOrderBy] = useState(props?.defaultOrderBy || 'name');
    const [order, setOrder] = useState(props?.defaultOrder || 'desc');
    const [page, setPage] = useState(props?.defaultCurrentPage || 0);
    const [rowsPerPage, setRowsPerPage] = useState(props?.defaultRowsPerPage || 5);

    // when onsort method is called, it will set the order and orderBy state
    const onSort = (id) => {
        const isAsc = orderBy === id && order === 'asc';
        if (id !== '' && id !== 'disabled') {
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(id);
        }
    };

    // onChangePage pagination
    const onChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // onChangeRowsPerPage pagination
    const onChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // filter

    return {
        page,
        order,
        setPage,
        orderBy,
        rowsPerPage,
        onSort,
        onChangePage,
        onChangeRowsPerPage,
    };
}

// ----------------------------------------------------------------------

export function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export function emptyRows(page, rowsPerPage, arrayLength) {
    return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}
