// import * as React from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Modal from "@mui/material/Modal";
// import { TextField } from "@mui/material";
// import classNames from "classnames/bind";
// import styles from "../AdminUser.module.scss";
// const cx = classNames.bind(styles);

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// export default function ButtonAddUser() {
//   const [open, setOpen] = React.useState(false);
//   const [value, setValue] = React.useState({});
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const handleValueInput = (id, value) => {};
//   return (
//     <div>
//       <Button  onClick={() => setOpen(true)}>Open modal</Button>
//       <Modal
//         open={open}
//          onClick={() => setOpen(false)}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <h2 className={cx("title")}>Nhập thông tin user</h2>
//           <div className={cx("form-input")}>
//             <label>
//               <TextField
//                 id="categoryId"
//                 label="Nhập CategoryId"
//                 variant="outlined"
//                 onChange={(e) => handleValueInput("categoryId", e.target.value)}
//               />
//             </label>
//             <label>
//               <TextField
//                 id="description"
//                 label="Nhập Description"
//                 variant="outlined"
//                 onChange={(e) =>
//                   handleValueInput("description", e.target.value)
//                 }
//               />
//             </label>
//             <label>
//               <TextField
//                 id="images"
//                 label="Nhập địa chỉ image"
//                 variant="outlined"
//                 onChange={(e) => handleValueInput("images", e.target.value)}
//               />
//             </label>
//             <label>
//               <TextField
//                 id="name"
//                 label="Nhập tên sản phẩm"
//                 variant="outlined"
//                 onChange={(e) => handleValueInput("name", e.target.value)}
//               />
//             </label>
//             <label>
//               <TextField
//                 id="price"
//                 label="Nhập giá sản phẩm"
//                 variant="outlined"
//                 onChange={(e) => handleValueInput("price", e.target.value)}
//               />
//             </label>
//             <label>
//               <TextField
//                 id="sku"
//                 label="Nhập Sku sản phẩm"
//                 variant="outlined"
//                 onChange={(e) => handleValueInput("sku", e.target.value)}
//               />
//             </label>
//           </div>
//         </Box>
//       </Modal>
//     </div>
//   );
// }
