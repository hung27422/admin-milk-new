import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import ButtonUpdateCategory from "../../pages/AdminCategory/ButtonUpdateCategory";
import ButtonDeleteCategory from "../../pages/AdminCategory/ButtonDeleteCategory";
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
export default function TableInfoCategory({ data }) {
  const sortedData = Array.isArray(data)
    ? [...data].sort((a, b) => a.id - b.id)
    : [];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">ID</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData?.map((item) => (
            <StyledTableRow key={item?.id}>
              <StyledTableCell align="center" component="th" scope="row">
                {item?.id}
              </StyledTableCell>
              <StyledTableCell align="center">{item?.name}</StyledTableCell>
              <StyledTableCell align="center">
                {item?.description}
              </StyledTableCell>
              <StyledTableCell align="center">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "200px",
                    alignItems: "center",
                    textAlign: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <ButtonUpdateCategory data={item} />
                  <ButtonDeleteCategory data={item} />
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
TableInfoCategory.propTypes = {
  data: PropTypes.array,
};
