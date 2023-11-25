import Dashboard from "../pages/Dashboard/Dashboard";
import AdminOrders from "../pages/AdminOrders/AdminOrders";
import AdminProduct from "../pages/AdminProducts/AdminProduct";
import AdminUser from "../pages/AdminUsers/AdminUser";
import LoginAdmin from "../pages/LoginAdmin/LoginAdmin";
import LayoutLogin from "../layouts/LayoutLogin/LayoutLogin";
import PageInfoUser from "../pages/AdminUsers/PageInfoUser/PageInfoUser";
import AdminInventory from "../pages/AdminInventory/AdminInventory";
import AdminShipping from "../pages/AdminShipping/AdminShipping";
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
  {
    path: "/PageInfoUser",
    component: PageInfoUser,
  },
  {
    path: "/AdminInventory",
    component: AdminInventory,
  },
  {
    path: "/AdminShipping",
    component: AdminShipping,
  },
];
export { publicRouter };
