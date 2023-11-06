import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ItemOrders from "../InformationOrders/ItemsOrders/ItemsOrders";
import PriceOrders from "../InformationOrders/PriceOrders/PriceOrders";
import TotalOrders from "../InformationOrders/TotalOrders/TotalOrders";
import QuantityOrders from "../InformationOrders/QuantityOrders/QuantityOrders";
import ActionOrders from "../InformationOrders/ActionOrders/ActionOrders";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TableInfo() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell width={"30%"}>Items</StyledTableCell>
            <StyledTableCell width={"20%"} align="center">
              Price
            </StyledTableCell>
            <StyledTableCell width={"15%"} align="center">
              Quantity
            </StyledTableCell>
            <StyledTableCell width={"15%"} align="center">
              Total
            </StyledTableCell>
            <StyledTableCell width={"20%"} align="center">
              Action
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              <ItemOrders />
            </StyledTableCell>
            <StyledTableCell align="center">
              <PriceOrders />
            </StyledTableCell>
            <StyledTableCell align="center">
              <QuantityOrders />
            </StyledTableCell>
            <StyledTableCell align="center">
              <TotalOrders />
            </StyledTableCell>
            <StyledTableCell align="center">
              <ActionOrders />
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
