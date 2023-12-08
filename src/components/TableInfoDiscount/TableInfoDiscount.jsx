import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import ButtonDeleteDiscount from "../../pages/AdminDiscount/ButtonDeleteDiscount";
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
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function TableInfoDiscount({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">ID</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="center">ActiveDate</StyledTableCell>
            <StyledTableCell align="center">ExpireDate</StyledTableCell>
            <StyledTableCell align="center">
              Special Day Condition
            </StyledTableCell>
            <StyledTableCell align="center">Quantity</StyledTableCell>
            <StyledTableCell align="center">Code</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item) => {
            return (
              <StyledTableRow key={item?.id}>
                <StyledTableCell align="center" component="th" scope="row">
                  {item?.id}
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                  {item?.description}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {formatDate(item?.activeDate)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {formatDate(item?.expireDate)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {formatDate(item?.specialDayCondition)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item?.quantity}
                </StyledTableCell>
                <StyledTableCell align="center">{item?.code}</StyledTableCell>
                <StyledTableCell align="center">
                  <ButtonDeleteDiscount data={item} />
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
TableInfoDiscount.propTypes = {
  data: PropTypes.array,
};
