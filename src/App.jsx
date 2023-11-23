// import { useAuth0 } from "@auth0/auth0-react";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import { publicRouter } from "./routers/routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useContext, useEffect } from "react";
// import useGetUserRoles from "./hooks/useGetUserRoles";
// import { AdminMilkContext } from "./components/AdminContextMilk/AdminContextMilk";
function App() {
  // const { user } = useAuth0();
  // const { fetchRoles } = useGetUserRoles();
  // const { setRoleName } = useContext(AdminMilkContext);
  // useEffect(() => {
  //   fetchRoles().then((result) => {
  //     if (!result) {
  //       return;
  //     }
  //     // console.log(result);
  //     result?.map((item) => {
  //       return setRoleName(item);
  //     });
  //   });
  // }, [user]);
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
