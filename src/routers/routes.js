import Dashboard from '../pages/Dashboard/Dashboard';
import AdminOrders from '../pages/AdminOrders/AdminOrders';
import AdminProduct from '../pages/AdminProducts/AdminProduct';
import AdminUser from '../pages/AdminUsers/AdminUser';
const publicRouter = [
  {
    path: '/',
    component: Dashboard,
  },
  {
    path: '/AdminOrders',
    component: AdminOrders,
  },
  {
    path: '/AdminProducts',
    component: AdminProduct,
  },
  {
    path: '/AdminUsers',
    component: AdminUser,
  },
];
export { publicRouter };
