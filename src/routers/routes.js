import Dashboard from "../pages/Dashboard/Dashboard";
import AdminOrders from "../pages/AdminOrders/AdminOrders";
import AdminProduct from "../pages/AdminProducts/AdminProduct";
const publicRouter = [
  {
    path: "/",
    component: Dashboard,
  },
  {
    path: "/AdminOrders",
    component: AdminOrders,
  },
  {
    path: "/AdminProduct",
    component: AdminProduct,
  },
];
export { publicRouter };
