import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ItemOrders from '../InformationOrders/ItemsOrders/ItemsOrders';
import PriceOrders from '../InformationOrders/PriceOrders/PriceOrders';
import TotalOrders from '../InformationOrders/TotalOrders/TotalOrders';
import QuantityOrders from '../InformationOrders/QuantityOrders/QuantityOrders';
import ButtonConfirm from '../InformationOrders/ButtonConfirm/ButtonConfirm';
import PropTypes from 'prop-types';
import ButtonShipment from '../InformationOrders/ButtonShipment/ButtonShipment';
import ButtonDelivered from '../InformationOrders/ButtonDelivered/ButtonDelivered';
import ButtonReceived from '../InformationOrders/ButtonReceived/ButtonReceived';
import { TablePagination } from '@mui/material';
import React from 'react';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function TableInfo({ isShowButton, results }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log('results', results);
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 800 }}>
        <Table sx={{ minWidth: 700 }} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell width={'30%'}>Items</StyledTableCell>
              <StyledTableCell width={'20%'} align="center">
                Price
              </StyledTableCell>
              <StyledTableCell width={'15%'} align="center">
                Quantity
              </StyledTableCell>
              <StyledTableCell width={'15%'} align="center">
                Total
              </StyledTableCell>
              <StyledTableCell width={'20%'} align="center">
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((items, index) => {
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      <ItemOrders data={items.items} />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <PriceOrders data={items.items} />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <QuantityOrders data={items.items} />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <TotalOrders data={items.items} />
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {isShowButton === '1' && <ButtonConfirm data={items} />}
                      {isShowButton === '2' && <ButtonShipment data={items} />}
                      {isShowButton === '3' && <ButtonDelivered data={items} />}
                      {isShowButton === '4' && (
                        <ButtonReceived data={items.items} />
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5, 10]}
        component="div"
        count={results.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
TableInfo.propTypes = {
  data: PropTypes.array,
  id: PropTypes.array,
  isShowButton: PropTypes.string,
  results: PropTypes.array,
};
