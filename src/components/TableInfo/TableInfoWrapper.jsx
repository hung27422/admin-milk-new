import TableInfo from "./TableInfo";
import PropTypes from "prop-types";

function TableInfoUnconfirmed({ unconfirmed, status }) {
  if (Array.isArray(status)) {
    const createdStatusUnconfirmed = unconfirmed?.filter(
      (item) => item.status === "CREATED"
    );

    if (
      Array.isArray(createdStatusUnconfirmed) &&
      createdStatusUnconfirmed.length > 0
    ) {
      return (
        <TableInfo
          data={createdStatusUnconfirmed.map((i) => i.items).flat()}
          isShowButton={"1"}
        />
      );
    }

    // Trả về một phần tử khác hoặc thông báo không có dữ liệu nếu không có item nào thỏa mãn điều kiện
    return <p>Không có dữ liệu để hiển thị.</p>;
  }
}
function TableInfoConfirmed({ confirmed, status }) {
  if (Array.isArray(status)) {
    const createdStatusConfirmed = confirmed?.filter(
      (item) => item.status === "CONFIRMED"
    );
    if (
      Array.isArray(createdStatusConfirmed) &&
      createdStatusConfirmed.length > 0
    ) {
      return (
        <TableInfo
          data={createdStatusConfirmed.map((i) => i.items).flat()}
          isShowButton={"2"}
          confirm={confirmed}
        />
      );
    }
  }
  // Trả về một phần tử khác hoặc thông báo không có dữ liệu nếu không có item nào thỏa mãn điều kiện
  return <p>Không có dữ liệu để hiển thị.</p>;
}

TableInfoUnconfirmed.propTypes = {
  unconfirmed: PropTypes.array,
  status: PropTypes.array,
};
TableInfoConfirmed.propTypes = {
  confirmed: PropTypes.array,
  status: PropTypes.array,
};
export { TableInfoUnconfirmed, TableInfoConfirmed };
