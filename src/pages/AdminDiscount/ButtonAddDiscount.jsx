import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
// import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "../AdminDiscount/AdminDiscount.module.scss";
import { gql, useMutation } from "@apollo/client";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import useQueryDiscount from "../../hooks/useQueryDiscount";
import useValidate from "../../hooks/useValidate";
const cx = classNames.bind(styles);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = date.getDate().toString().padStart(2, "0");
  const formattedDate = `${month}-${day}-${year}`;

  return formattedDate;
}
const CREATE_DISCOUNT = gql`
  mutation CreateDiscount($input: orderCreateDiscountInput!) {
    createDiscount(input: $input) {
      string
    }
  }
`;
export default function ButtonAddDiscount() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [createDiscount] = useMutation(CREATE_DISCOUNT);
  const [value, setValue] = useState({});
  const [valueDate, setValueDate] = useState({});
  const { refetch } = useQueryDiscount();
  const { discountSchema, discountSchemaDate } = useValidate();
  const [error, setError] = useState(null);

  const handleDateChange = (id, selectedDate) => {
    if (selectedDate) {
      const formattedDate = formatDate(selectedDate);
      setValueDate((prev) => ({
        ...prev,
        [id]: formattedDate,
      }));
    }
  };

  const handleValueInput = (id, value) => {
    setValue((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  // React.useEffect(() => {
  //   console.log(value, valueDate);
  // }, [value, valueDate]);
  const handleAddDiscount = async () => {
    const validationResultDate = discountSchemaDate.validate(valueDate);
    const validationResult = discountSchema.validate(value);
    const combinedErrors = [
      ...(validationResultDate.error?.details || []),
      ...(validationResult.error?.details || []),
    ];

    if (combinedErrors.length > 0) {
      setError(combinedErrors.map((detail) => detail.message).join(", "));
      return; // Ngăn chặn thực hiện mutation khi có lỗi
    }
    const orderCreateDiscountInput = {
      input: {
        activeDate: new Date(valueDate?.activeDate),
        amount: Number(value?.amount),
        birthdayCondition: new Date(valueDate?.birthdayCondition),
        code: value?.code,
        description: value?.description,
        expireDate: new Date(valueDate?.expireDate),
        quantity: Number(value?.quantity),
        specialDayCondition: new Date(valueDate?.specialDayCondition),
        totalOverCondition: 0,
        type: "FIXED",
      },
    };
    const result = await createDiscount({
      variables: {
        input: orderCreateDiscountInput.input,
      },
    });
    refetch();
    setOpen(false);
    console.log("Thêm discount thành công: ", result);
  };
  return (
    <div>
      <Button
        style={{
          backgroundColor: "var(--secondary)",
          color: "var(--white)",
        }}
        onClick={() => setOpen(true)}
      >
        Thêm discount
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className={cx("title")}>Nhập thông tin sản phẩm</h2>
          <div className={cx("form-input")}>
            <label className={cx("form-item")}>
              <span>Chọn ActiveDate </span>
              <DatePicker
                onChange={(date) => handleDateChange("activeDate", date)}
              />
            </label>
            <label className={cx("form-item")}>
              <span>Chọn ExpireDate </span>
              <DatePicker
                onChange={(date) => handleDateChange("expireDate", date)}
              />
            </label>
            <label className={cx("form-item")}>
              <span>Chọn BirthdayCondition </span>
              <DatePicker
                onChange={(date) => handleDateChange("birthdayCondition", date)}
              />
            </label>
            <label className={cx("form-item")}>
              <span>Chọn SpecialDayCondition </span>
              <DatePicker
                onChange={(date) =>
                  handleDateChange("specialDayCondition", date)
                }
              />
            </label>
            <label className={cx("form-item")}>
              <TextField
                id="description"
                label="Nhập mô tả discount"
                variant="outlined"
                onChange={(e) =>
                  handleValueInput("description", e.target.value)
                }
              />
            </label>
            <label className={cx("form-item")}>
              <TextField
                id="amount"
                label="Nhập giá giảm giá"
                variant="outlined"
                onChange={(e) => handleValueInput("amount", e.target.value)}
              />
            </label>
            <label className={cx("form-item")}>
              <TextField
                id="quantity"
                label="Nhập số lượng"
                variant="outlined"
                onChange={(e) => handleValueInput("quantity", e.target.value)}
              />
            </label>
            <label className={cx("form-item")}>
              <TextField
                id="code"
                label="Nhập Code"
                variant="outlined"
                onChange={(e) => handleValueInput("code", e.target.value)}
              />
            </label>
          </div>
          <div style={{ textAlign: "center" }}>
            {error && (
              <span style={{ color: "red", textAlign: "center" }}>{error}</span>
            )}
          </div>
          <div className={cx("btn-action")}>
            <Button
              style={{
                color: "var(--white)",
                backgroundColor: "var(--secondary)",
              }}
              onClick={handleClose}
            >
              Thoát
            </Button>
            <Button
              style={{
                color: "var(--white)",
                backgroundColor: "var(--secondary)",
              }}
              onClick={handleAddDiscount}
            >
              Thêm
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

// ButtonAddDiscount.propTypes = {
//   data: PropTypes.object,
// };
