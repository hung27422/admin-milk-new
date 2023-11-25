import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminMilkContext } from "../../components/AdminContextMilk/AdminContextMilk";

function Dashboard() {
  const { roleName } = useContext(AdminMilkContext);
  if (roleName?.name === "nvbh")
    return <Navigate to="/AdminOrders" replace={true} />;
  if (roleName?.name === "nvbh")
    return <Navigate to="/AdminShipping" replace={true} />;
  else {
    return <div className="">Dashboard</div>;
  }
}

export default Dashboard;
