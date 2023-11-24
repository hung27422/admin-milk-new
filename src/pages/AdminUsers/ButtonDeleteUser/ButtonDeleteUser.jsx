import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import { gql, useMutation } from "@apollo/client";
import useQueryUser from "../../../hooks/useQueryUser";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const DELETE_USER = gql`
  mutation DeleteUser($input: userDeleteUserInput!) {
    deleteUser(input: $input) {
      userDeletedPayload {
        message
      }
    }
  }
`;
export default function ButtonDeleteUser({ data }) {
  const [open, setOpen] = React.useState(false);
  const [deleteUser, { error }] = useMutation(DELETE_USER);
  const { refetch } = useQueryUser();
  if (error) console.log("Lỗi xóa user: ", error);
  const handleOpen = () => setOpen(true);
  const handleDeleteUser = async () => {
    const userDeleteUserInput = {
      input: {
        id: data?.id,
      },
    };
    const result = await deleteUser({
      context: {
        headers: {
          authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI3MWE5NTM0NS03YmYwLTQwMDYtYjBhNi05YmYwODdiZTA4Y2YiLCJuYW1lIjoiSOG7kyBU4bqlbiBIw7luZyIsImp0aSI6IjcxQTk1MzQ1LTdCRjAtNDAwNi1CMEE2LTlCRjA4N0JFMDhDRiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzAxMDU0NjMxLCJpc3MiOiJJZldoYXQiLCJhdWQiOiJJZldoYXRDbGllbnQifQ.b8bvU_whCazN5PktrXMXiitOD-ggE7bXqB7xag_7E2QwNP2qnk_fv9eTSCVmEUY1EiyNlNcXMsjm8QSA74Hr0g`,
        },
      },
      variables: {
        input: userDeleteUserInput.input,
      },
    });
    refetch;
    console.log("Xóa user thành công: ", result);
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
        Delete
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h3 style={{ marginBottom: "15px" }}>
              Bạn có chắc chắn muốn xóa user:{" "}
              <span style={{ color: "red" }}>{data?.name}</span>
            </h3>
            <div>
              <Button
                style={{
                  width: "150px",
                  backgroundColor: "var(--secondary)",
                  color: "var(--white)",
                  marginRight: "4px",
                }}
                onClick={() => setOpen(false)}
              >
                Hủy
              </Button>
              <Button
                style={{
                  width: "150px",
                  backgroundColor: "var(--secondary)",
                  color: "var(--white)",
                  marginLeft: "4px",
                }}
                onClick={handleDeleteUser}
              >
                Chắc chắn
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
ButtonDeleteUser.propTypes = {
  data: PropTypes.object,
};
