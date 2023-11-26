import classNames from "classnames/bind";
import styles from "./PageInfoUser.module.scss";
import { useAuth0 } from "@auth0/auth0-react";
import useQueryUser from "../../../hooks/useQueryUser";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
const cx = classNames.bind(styles);
// import PropTypes from "prop-types";
const UPDATE_USER = gql`
  mutation UpdateUser($updateUserId: userUUID!, $input: userUpdateUserInput!) {
    updateUser(id: $updateUserId, input: $input) {
      userUpdatedPayload {
        apiToken
        message
      }
    }
  }
`;
function PageInfoUser() {
  const { user } = useAuth0();
  const { data, error } = useQueryUser();
  if (error) console.log(error);
  // console.log(data);
  const [updateUser] = useMutation(UPDATE_USER);

  //   const [value, setValue] = useState("");
  const [formValues, setFormValues] = useState({});

  const userIdLocal = localStorage.getItem("userId");
  useEffect(() => {
    data?.users?.map((item) => {
      if (item?.email === user?.email) {
        setFormValues(item);
      }
    });
  }, [data?.users, user?.email]);
  const handleUpdateInfo = (id, value) => {
    const newObj = { ...formValues };
    newObj[id] = value;
    setFormValues(newObj);
  };
  // console.log(formValues);
  const handleUpdateUser = async (id, token) => {
    const userUpdateUserInput = {
      updateUserId: `${id}`,
      input: {
        email: user?.email,
        name: formValues.name,
        phoneNumber: formValues.phoneNumber,
        imageURL: user?.picture,
        token: token,
      },
    };
    try {
      const result = await updateUser({
        context: {
          headers: {
            authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI3MWE5NTM0NS03YmYwLTQwMDYtYjBhNi05YmYwODdiZTA4Y2YiLCJuYW1lIjoiSOG7kyBU4bqlbiBIw7luZyIsImp0aSI6IjcxQTk1MzQ1LTdCRjAtNDAwNi1CMEE2LTlCRjA4N0JFMDhDRiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzAxMDU0NjMxLCJpc3MiOiJJZldoYXQiLCJhdWQiOiJJZldoYXRDbGllbnQifQ.b8bvU_whCazN5PktrXMXiitOD-ggE7bXqB7xag_7E2QwNP2qnk_fv9eTSCVmEUY1EiyNlNcXMsjm8QSA74Hr0g`,
          },
        },
        variables: {
          updateUserId: userUpdateUserInput.updateUserId,
          input: userUpdateUserInput.input,
        },
      });
      console.log("Đã update user thành công:", result);
    } catch (error) {
      console.error("Lỗi khi update user:", error);
    }
  };
  return (
    <div className={cx("wrapper")}>
      {data?.users?.map((item) => {
        if (item?.email === user?.email) {
          let result = (
            <div key={item?.id} className={cx("box-user")}>
              <img className={cx("img-user")} src={user?.picture} alt="" />
              <div className={cx("info-user")}>
                <span className={cx("email-user")}>{item?.email}</span>
                <span className={cx("name-user")}>{item?.name}</span>
              </div>
              <div className={cx("content")}>
                <TextField
                  className={cx("input-data")}
                  id="name"
                  label={"Họ và tên"}
                  // defaultValue={}
                  placeholder="Nhập tên bạn muốn thay đổi"
                  variant="outlined"
                  value={formValues?.name}
                  onChange={(e) => handleUpdateInfo("name", e.target.value)}
                />
                <TextField
                  className={cx("input-data")}
                  id="address"
                  label={item?.id}
                  value={userIdLocal}
                  variant="outlined"
                />
                <TextField
                  className={cx("input-data")}
                  id="phone"
                  label={item?.phoneNumber}
                  variant="outlined"
                  placeholder="Nhập số điện thoại bạn muốn thay đổi"
                  value={formValues["phoneNumber"] || ""}
                  onChange={(e) =>
                    handleUpdateInfo("phoneNumber", e.target.value)
                  }
                />
                <TextField
                  className={cx("input-data")}
                  id="email"
                  // label={item?.email}
                  value={user?.email}
                  variant="outlined"
                  // onChange={(e) => handleUpdateInfo("email", e.target.value)}
                />
              </div>
              <div className={cx("btn-action")}>
                <Button onClick={() => handleUpdateUser(item?.id, item?.token)}>
                  Lưu thay đổi
                </Button>
              </div>
            </div>
          );
          return result;
        }
      })}
    </div>
  );
}

export default PageInfoUser;
