import TableInfo from "./TableInfo";
import PropTypes from "prop-types";

function TableInfoUnconfirmed({ unconfirmed, status }) {
  if (Array.isArray(status)) {
    const createdStatus = status.map((stt) => stt === "CREATED");
    if (createdStatus) {
      return <TableInfo data={unconfirmed?.map((i) => i.items).flat()} />;
    }
  }
}

TableInfoUnconfirmed.propTypes = {
  unconfirmed: PropTypes.array,
  status: PropTypes.array,
};
export { TableInfoUnconfirmed };
