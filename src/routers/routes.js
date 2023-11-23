import Dashboard from "../pages/Dashboard/Dashboard";
import AdminOrders from "../pages/AdminOrders/AdminOrders";
import AdminProduct from "../pages/AdminProducts/AdminProduct";
import AdminUser from "../pages/AdminUsers/AdminUser";
import LoginAdmin from "../pages/LoginAdmin/LoginAdmin";
import LayoutLogin from "../layouts/LayoutLogin/LayoutLogin";
const publicRouter = [
  {
    path: "/",
    component: LoginAdmin,
    layout: LayoutLogin,
  },
  {
    path: "/DashboardAdmin",
    component: Dashboard,
  },
  {
    path: "/AdminOrders",
    component: AdminOrders,
  },
  {
    path: "/AdminProducts",
    component: AdminProduct,
  },
  {
    path: "/AdminUsers",
    component: AdminUser,
  },
];
export { publicRouter };
