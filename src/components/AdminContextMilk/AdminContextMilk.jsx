import { createContext, useState } from "react";
import PropTypes from "prop-types";
export const AdminMilkContext = createContext();

function AdminContextMilk({ children }) {
  const [roleName, setRoleName] = useState();
  const [apiTokenAmin, setApiTokenAdmin] = useState();
  return (
    <AdminMilkContext.Provider
      value={{ roleName, setRoleName, apiTokenAmin, setApiTokenAdmin }}
    >
      {children}
    </AdminMilkContext.Provider>
  );
}

export default AdminContextMilk;

AdminContextMilk.propTypes = {
  children: PropTypes.element,
};
