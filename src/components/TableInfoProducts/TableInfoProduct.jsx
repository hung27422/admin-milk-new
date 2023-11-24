import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import IDProduct from "../../pages/AdminProducts/IDProduct/IDProduct";
import ItemProducts from "../../pages/AdminProducts/ItemProducts/ItemProducts";
import PriceProducts from "../../pages/AdminProducts/PriceProducts/PriceProducts";
import SkuProducts from "../../pages/AdminProducts/SkuProducts/SkuProducts";
import CategoryProducts from "../../pages/AdminProducts/CategoryProducts/CategoryProducts";
import ButtonDeleteProduct from "../../pages/AdminProducts/ButtonActions/ButtonDeleteProduct/ButtonDeleteProduct";
import ButtonUpdateProduct from "../../pages/AdminProducts/ButtonActions/ButtonUpdateProduct/ButtonUpdateProduct";
import ButtonAddInventory from "../TableInfoInventory/ButtonAddInventory/ButtonAddInventory";
import { useContext } from "react";
import { AdminMilkContext } from "../AdminContextMilk/AdminContextMilk";
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

export default function TableInfoProduct({ data }) {
  const { roleName } = useContext(AdminMilkContext);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell width={"10%"}>ID</StyledTableCell>
            <StyledTableCell width={"25%"} align="center">
              Items
            </StyledTableCell>
            <StyledTableCell width={"15%"} align="center">
              Price
            </StyledTableCell>
            <StyledTableCell width={"15%"} align="center">
              Sku
            </StyledTableCell>
            <StyledTableCell width={"15%"} align="center">
              Category
            </StyledTableCell>
            <StyledTableCell width={"20%"} align="center">
              Action
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item) => {
            let infoProduct = (
              <StyledTableRow key={item?.id}>
                <StyledTableCell width={"10%"} component="th" scope="row">
                  <IDProduct data={item} />
                </StyledTableCell>
                <StyledTableCell width={"25%"} align="center">
                  <ItemProducts data={item} />
                </StyledTableCell>
                <StyledTableCell width={"15%"} align="center">
                  <PriceProducts data={item} />
                </StyledTableCell>
                <StyledTableCell width={"15%"} align="center">
                  <SkuProducts data={item} />
                </StyledTableCell>
                <StyledTableCell width={"15%"} align="center">
                  <CategoryProducts data={item} />
                </StyledTableCell>
                <StyledTableCell width={"20%"} align="center">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    {roleName?.name === "nvbh" &&
                      roleName?.name === "Admin" && (
                        <>
                          <ButtonUpdateProduct data={item} />
                          <ButtonDeleteProduct data={item} />
                        </>
                      )}

                    {roleName?.name === "nvk" && (
                      <ButtonAddInventory data={item} />
                    )}
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            );
            return infoProduct;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
TableInfoProduct.propTypes = {
  data: PropTypes.array,
};
