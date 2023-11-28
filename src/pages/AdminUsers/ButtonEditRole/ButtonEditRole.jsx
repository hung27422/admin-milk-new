import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import useQueryRoleUser from "../../../hooks/useQueryRoleUser";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const SET_USER_ROLE = gql`
  mutation SetUserRole($input: userSetUserRoleInput!) {
    setUserRole(input: $input) {
      string
    }
  }
`;
export default function ButtonEditRole({ data: dataUser }) {
  const [open, setOpen] = React.useState(false);
  const apiTokenLocal = localStorage.getItem("apiToken");
  const [roleId, setRoleId] = useState(1);
  const [setUserRole, { error: errorMutaion }] = useMutation(SET_USER_ROLE);
  if (errorMutaion) console.log("Lỗi mutation role user", errorMutaion);

  const { data, error, refetch } = useQueryRoleUser();
  if (error) console.log(error);

  const handleChangeRoleID = (value) => {
    setRoleId(value);
  };
  const handleChangRoles = async (id) => {
    const userSetUserRoleInput = {
      input: {
        roleId: parseInt(id),
        userId: dataUser?.id,
      },
    };
    const result = await setUserRole({
      context: {
        headers: {
          authorization: `Bearer ${apiTokenLocal}`,
        },
      },
      variables: {
        input: userSetUserRoleInput.input,
      },
    });
    console.log("Change Roles Success", result);
    setOpen(false);
    refetch();
  };
  return (
    <div>
      <Button
        style={{
          backgroundColor: "var(--secondary)",
          color: "var(--white)",
          width: "100px",
        }}
        onClick={() => setOpen(true)}
      >
        Edit Role
      </Button>
      <Modal
        open={open}
        onClick={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Roles</FormLabel>
            {data?.roles.map((item) => {
              return (
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  value={roleId.toString()}
                  key={item?.id}
                  onChange={(e) => handleChangeRoleID(e.target.value)}
                >
                  <FormControlLabel
                    value={item?.id.toString()}
                    control={<Radio />}
                    label={item?.description}
                  />
                </RadioGroup>
              );
            })}
            <Button onClick={() => handleChangRoles(roleId)}>Thay đổi</Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}
ButtonEditRole.propTypes = {
  data: PropTypes.object,
};
