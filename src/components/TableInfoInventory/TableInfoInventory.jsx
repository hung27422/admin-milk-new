import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import IDInventory from "./IDInventory/IDInventory";
import IDProduct from "./IDProduct/IDProduct";
import ItemProductInventory from "./ItemProductInventory/ItemProductInventory";
import QuantityInventory from "./QuantityInventory/QuantityInventory";
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

export default function TableInfoInventory({ data }) {
  console.log(data?.inventories);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">ID</StyledTableCell>
            <StyledTableCell align="center">ID Product</StyledTableCell>
            <StyledTableCell align="center">Item</StyledTableCell>
            <StyledTableCell align="center">Quantity</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.inventories.map((item) => {
            let result = (
              <StyledTableRow key={item?.id}>
                {/*  */}
                <StyledTableCell align="center" component="th" scope="row">
                  <IDInventory data={item} />
                </StyledTableCell>
                {/*  */}
                <StyledTableCell align="center">
                  <IDProduct data={item} />
                </StyledTableCell>
                {/*  */}
                <StyledTableCell align="center">
                  <ItemProductInventory data={item} />
                </StyledTableCell>
                {/*  */}
                <StyledTableCell align="center">
                  <QuantityInventory data={item} />
                </StyledTableCell>{" "}
                <StyledTableCell align="center">Action</StyledTableCell>
              </StyledTableRow>
            );
            return result;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
TableInfoInventory.propTypes = {
  data: PropTypes.array,
};
