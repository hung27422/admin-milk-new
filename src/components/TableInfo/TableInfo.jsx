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
import ButtonConfirm from "../InformationOrders/ButtonConfirm/ButtonConfirm";
import PropTypes from "prop-types";
import ButtonShipment from "../InformationOrders/ButtonShipment/ButtonShipment";
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

export default function TableInfo({ data, isShowButton }) {
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
          {data?.map((item) => {
            return (
              <StyledTableRow key={item.id}>
                <StyledTableCell component="th" scope="row">
                  <ItemOrders data={item} />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <PriceOrders data={item} />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <QuantityOrders data={item} />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TotalOrders data={item} />
                </StyledTableCell>

                <StyledTableCell align="center">
                  {isShowButton === "1" && <ButtonConfirm data={item} />}
                  {isShowButton === "2" && <ButtonShipment data={item} />}
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
TableInfo.propTypes = {
  data: PropTypes.array,
  id: PropTypes.array,
  isShowButton: PropTypes.string,
};
