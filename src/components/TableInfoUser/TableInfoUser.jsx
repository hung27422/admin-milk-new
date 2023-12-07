import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ImageUser from "../../pages/AdminUsers/ImageUser/ImageUser";
import NameUser from "../../pages/AdminUsers/NameUser/NameUser";
import PhoneUser from "../../pages/AdminUsers/PhoneUser/PhoneUser";
import MailUser from "../../pages/AdminUsers/MailUser/MailUser";
import RoleUser from "../../pages/AdminUsers/RoleUser.jsx/RoleUser";
import PropTypes from "prop-types";
import ButtonDeleteUser from "../../pages/AdminUsers/ButtonDeleteUser/ButtonDeleteUser";
import ButtonEditRole from "../../pages/AdminUsers/ButtonEditRole/ButtonEditRole";
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

export default function TableInfoUser({ data }) {
  const compareRoles = (a, b) => {
    const roleOrder = ["Admin", "nvbh", "nvk", "shipper", "User"];
    return roleOrder.indexOf(a.role.name) - roleOrder.indexOf(b.role.name);
  };
  const sortedData = Array.isArray(data) ? [...data].sort(compareRoles) : [];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Phone</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Role</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData?.map((item) => {
            let result = (
              <StyledTableRow key={item?.id}>
                <StyledTableCell component="th" scope="row">
                  <ImageUser data={item} />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <NameUser data={item} />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <PhoneUser data={item} />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <MailUser data={item} />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <RoleUser data={item} />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <ButtonDeleteUser data={item} />
                    <ButtonEditRole data={item} />
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            );
            return result;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
TableInfoUser.propTypes = {
  data: PropTypes.array,
};
