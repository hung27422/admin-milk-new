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
      userUpdatedPayload {
        apiToken
        message
      }
    }
  }
`;
export default function ButtonEditRole({ data: dataUser }) {
  const [open, setOpen] = React.useState(false);
  const [roleId, setRoleId] = useState(1);
  const [setUserRole, { error: errorMutaion }] = useMutation(SET_USER_ROLE);
  if (errorMutaion) console.log("Lỗi mutation role user", errorMutaion);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data, error, refetch } = useQueryRoleUser();
  if (error) console.log(error);

  const handleChangeRoleID = (value) => {
    setRoleId(value);
  };
  const handleChangRoles = async (id) => {
    const userSetUserRoleInput = {
      input: {
        roleId: id,
        userId: dataUser?.id,
      },
    };
    const result = await setUserRole({
      context: {
        headers: {
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI3MWE5NTM0NS03YmYwLTQwMDYtYjBhNi05YmYwODdiZTA4Y2YiLCJuYW1lIjoiSOG7kyBU4bqlbiBIw7luZyIsImp0aSI6IjcxQTk1MzQ1LTdCRjAtNDAwNi1CMEE2LTlCRjA4N0JFMDhDRiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzAxMDU0NjMxLCJpc3MiOiJJZldoYXQiLCJhdWQiOiJJZldoYXRDbGllbnQifQ.b8bvU_whCazN5PktrXMXiitOD-ggE7bXqB7xag_7E2QwNP2qnk_fv9eTSCVmEUY1EiyNlNcXMsjm8QSA74Hr0g`,
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
        onClick={handleOpen}
      >
        Edit Role
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
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
