// import { useAuth0 } from "@auth0/auth0-react";
import { gql, useMutation } from "@apollo/client";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import { publicRouter } from "./routers/routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import { AdminMilkContext } from "./components/AdminContextMilk/AdminContextMilk";
const CREATE_USER = gql`
  mutation LoginUser($input: userLoginUserInput!) {
    loginUser(input: $input) {
      userCreatedPayload {
        apiToken
        message
        userId
      }
    }
  }
`;

function App() {
  const [createUser, { error }] = useMutation(CREATE_USER, {
    fetchPolicy: "network-only",
  });
 
  if (error) console.log("Lỗi tạo user: ", error);
  const { user, isAuthenticated } = useAuth0();
  const [idRole, setIdRole] = useState(1);
  const { roleName } = useContext(AdminMilkContext);
  useEffect(() => {
    if (isAuthenticated) {
      if (roleName?.name === "Admin") {
        setIdRole(1);
      } else if (roleName?.name === "nvbh") {
        setIdRole(4);
      } else if (roleName?.name === "nvk") {
        setIdRole(5);
      }
      const input = {
        input: {
          email: user?.email,
          imageURL: user?.picture, // 'picture' thay thế cho 'imageURL' nếu cần
          name: user?.name || "null",
          phoneNumber: "0987654321",
          roleId: idRole,
          token: user?.token || "1",
        },
      };
      const getAPI = async () => {
        try {
          const response = await createUser({ variables: { input } });
          const userCreatedPayload = response.data.loginUser.userCreatedPayload;

          const userID = userCreatedPayload.userId;

          // Lưu giá trị vào local storage
          localStorage.setItem("userId", userID);
        } catch (error) {
          console.error("Lỗi tạo user:", error);
        } finally {
          console.log("Tạo user thành công");
        }
      };
      getAPI();
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRouter.map((router, index) => {
            let Layout = DefaultLayout;
            if (router.layout) {
              Layout = router.layout;
            }
            let Page = router.component;
            return (
              <Route
                key={index}
                path={router.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              ></Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
