import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { MenuItem, TextField } from "@mui/material";
// import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "../AdminDiscount/AdminDiscount.module.scss";
import { gql, useMutation } from "@apollo/client";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import useQueryDiscount from "../../hooks/useQueryDiscount";
import PropTypes from "prop-types";
import { useEffect } from "react";
import dayjs from "dayjs";
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
const UPDATE_DISCOUNT = gql`
  mutation UpdateDiscount($input: orderUpdateDiscountInput!) {
    updateDiscount(input: $input) {
      string
    }
  }
`;
const typeDiscount = [
  {
    value: "FIXED",
    label: "FIXED",
  },
  {
    value: "PERCENT",
    label: "PERCENT",
  },
];
export default function ButtonUpdateDiscount({ data }) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [updateDiscount] = useMutation(UPDATE_DISCOUNT);
  const [value, setValue] = useState();
  const [valueDate, setValueDate] = useState();
  const { refetch } = useQueryDiscount();
  useEffect(() => {
    setValueDate(data);
    setValue(data);
  }, [data]);

  const handleDateChange = (id, selectedDate) => {
    if (selectedDate && selectedDate.isValid()) {
      const formattedDate = formatDate(selectedDate.toDate());
      setValueDate((prev) => ({
        ...prev,
        [id]: formattedDate,
      }));
    }
  };
  useEffect(() => {
    if (value) {
      console.log(value);
    }
  }, [value]);
  const handleValueInput = (id, value) => {
    setValue((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleUpdateDiscount = async () => {
    const orderUpdateDiscountInput = {
      input: {
        activeDate: valueDate?.activeDate || data?.activeDate,
        amount: Number(value?.amount) || data?.amount,
        code: Number(value?.code) || data?.code,
        description: value?.description || data?.description,
        expireDate: valueDate?.expireDate || data?.expireDate,
        id: data?.id,
        quantity: Number(value?.quantity) || data?.quantity,
        type: value?.type || data?.type,
      },
    };
    const result = await updateDiscount({
      variables: {
        input: orderUpdateDiscountInput.input,
      },
    });
    refetch();
    setOpen(false);
    console.log("Update discount thành công: ", result);
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
        UPDATE
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
                value={dayjs(valueDate?.activeDate)}
                onChange={(date) => handleDateChange("activeDate", date)}
              />
            </label>
            <label className={cx("form-item")}>
              <span>Chọn ExpireDate </span>
              <DatePicker
                value={dayjs(valueDate?.expireDate)}
                onChange={(date) => handleDateChange("expireDate", date)}
              />
            </label>
            {/* <label className={cx("form-item")}>
              <span>Chọn BirthdayCondition </span>
              <DatePicker
                value={valueDate?.birthdayCondition}
                onChange={(date) => handleDateChange("birthdayCondition", date)}
              />
            </label> */}
            {/* <label className={cx("form-item")}>
              <span>Chọn SpecialDayCondition </span>
              <DatePicker
                value={valueDate?.specialDayCondition}
                onChange={(date) =>
                  handleDateChange("specialDayCondition", date)
                }
              />
            </label> */}
            <label className={cx("form-item")}>
              <TextField
                id="description"
                label="Nhập mô tả discount"
                variant="outlined"
                value={value?.description}
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
                value={value?.amount}
                onChange={(e) => handleValueInput("amount", e.target.value)}
              />
            </label>
            <label className={cx("form-item")}>
              <TextField
                id="quantity"
                label="Nhập số lượng"
                variant="outlined"
                value={value?.quantity}
                onChange={(e) => handleValueInput("quantity", e.target.value)}
              />
            </label>
            <label className={cx("form-item")}>
              <TextField
                id="code"
                label="Nhập Code"
                variant="outlined"
                value={value?.code}
                onChange={(e) => handleValueInput("code", e.target.value)}
              />
            </label>
            <label className={cx("form-item")}>
              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                value={value?.type}
                onChange={(e) => handleValueInput("type", e.target.value)}
                helperText="Please select your currency"
              >
                {typeDiscount.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </label>
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
              onClick={handleUpdateDiscount}
            >
              Update
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

ButtonUpdateDiscount.propTypes = {
  data: PropTypes.object,
};
