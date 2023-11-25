import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ButtonConfirm from "../InformationOrders/ButtonConfirm/ButtonConfirm";
import PropTypes from "prop-types";
import { TablePagination } from "@mui/material";
import React from "react";
import IDUserOrders from "../InformationOrders/IDUserOrders/IDUserOrders";
import NameUerOrders from "../InformationOrders/NameUerOrders/NameUerOrders";
import PhoneUserOrders from "../InformationOrders/PhoneUserOrders/PhoneUserOrders";
import AddressUserOrders from "../InformationOrders/AddressUserOrders/AddressUserOrders";
import ButtonInformation from "../InformationOrders/ButtoShowInfomationUser/ButtonInformation";
import ButtonShipping from "../../pages/AdminShipping/ButtonAction/ButtonShipping/ButtonShipping";
import ButtonDoneShip from "../../pages/AdminShipping/ButtonAction/ButtonDoneShip/ButtonDoneShip";
import ButtonCancelShip from "../../pages/AdminShipping/ButtonAction/ButtonCancelShip/ButtonCancelShip";
// import { AdminMilkContext } from "../AdminContextMilk/AdminContextMilk";
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

export default function TableInfo({ isShowButton, results }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const { roleName, setRoleName } = React.useContext(AdminMilkContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 800 }}>
        <Table sx={{ minWidth: 700 }} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell width={"15%"}>ID USER</StyledTableCell>
              <StyledTableCell width={"20%"} align="center">
                NAME
              </StyledTableCell>
              <StyledTableCell width={"15%"} align="center">
                PHONE NUMBER
              </StyledTableCell>
              <StyledTableCell width={"25%"} align="center">
                Address
              </StyledTableCell>
              <StyledTableCell width={"25%"} align="center">
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
                      <IDUserOrders data={items} />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <NameUerOrders data={items} />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <PhoneUserOrders data={items} />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <AddressUserOrders data={items} />
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {isShowButton === "1" && <ButtonConfirm data={items} />}
                      {isShowButton === "2" && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                          }}
                        >
                          <ButtonInformation data={items} />
                          <ButtonShipping data={items} />
                        </div>
                      )}
                      {isShowButton === "3" && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                          }}
                        >
                          <ButtonInformation data={items} />
                          <ButtonDoneShip data={items} />
                          <ButtonCancelShip data={items} />
                        </div>
                      )}
                      {isShowButton === "4" && (
                        <ButtonInformation data={items} />
                      )}
                      {isShowButton === "5" && (
                        <ButtonInformation data={items} />
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
