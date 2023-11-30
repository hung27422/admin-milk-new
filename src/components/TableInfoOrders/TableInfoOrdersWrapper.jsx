import TableInfo from "./TableInfoOrders";
import PropTypes from "prop-types";

//Chưa xác nhận
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
          results={createdStatusUnconfirmed.map((i) => i).flat()}
          isShowButton={"1"}
        />
      );
    }

    // Trả về một phần tử khác hoặc thông báo không có dữ liệu nếu không có item nào thỏa mãn điều kiện
    return <p>Không có dữ liệu để hiển thị.</p>;
  }
}
//Đã xác nhận
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
          results={createdStatusConfirmed.map((i) => i).flat()}
          isShowButton={"2"}
        />
      );
    }
  }
  // Trả về một phần tử khác hoặc thông báo không có dữ liệu nếu không có item nào thỏa mãn điều kiện
  return <p>Không có dữ liệu để hiển thị.</p>;
}
//Giao hàng
function TableInfoShipment({ shipment, status }) {
  if (Array.isArray(status)) {
    const createdStatusShipment = shipment?.filter(
      (item) => item.status === "SHIPPING"
    );
    if (
      Array.isArray(createdStatusShipment) &&
      createdStatusShipment.length > 0
    ) {
      return (
        <TableInfo
          results={createdStatusShipment.map((i) => i).flat()}
          isShowButton={"3"}
        />
      );
    }
  }
  return <p>Không có dữ liệu để hiển thị.</p>;
}
function TableInfoDelivered({ delivered, status }) {
  if (Array.isArray(status)) {
    const createdStatusComplete = delivered?.filter(
      (item) => item.status === "DELIVERED"
    );
    if (
      Array.isArray(createdStatusComplete) &&
      createdStatusComplete.length > 0
    ) {
      return (
        <TableInfo
          results={createdStatusComplete.map((i) => i).flat()}
          isShowButton={"4"}
        />
      );
    }
  }
  return <p>Không có dữ liệu để hiển thị.</p>;
}
function TableInfoComplete({ complete, status }) {
  if (Array.isArray(status)) {
    const createdStatusComplete = complete?.filter(
      (item) => item.status === "DONE"
    );
    if (
      Array.isArray(createdStatusComplete) &&
      createdStatusComplete.length > 0
    ) {
      return (
        <TableInfo
          results={createdStatusComplete.map((i) => i).flat()}
          isShowButton={"5"}
        />
      );
    }
  }
  return <p>Không có dữ liệu để hiển thị.</p>;
}
function TableInfoCancel({ cancel, status }) {
  if (Array.isArray(status)) {
    const createdStatusComplete = cancel?.filter(
      (item) => item.status === "CANCELLED"
    );
    if (
      Array.isArray(createdStatusComplete) &&
      createdStatusComplete.length > 0
    ) {
      return (
        <TableInfo
          results={createdStatusComplete.map((i) => i).flat()}
          isShowButton={"5"}
        />
      );
    }
  }
  return <p>Không có dữ liệu để hiển thị.</p>;
}
// eslint-disable-next-line react/prop-types
function TableInfoReport({ report }) {
  return <TableInfo results={report} isShowButton={"1"} />;
}
// Hello 123
TableInfoUnconfirmed.propTypes = {
  unconfirmed: PropTypes.array,
  status: PropTypes.array,
};
TableInfoConfirmed.propTypes = {
  confirmed: PropTypes.array,
  status: PropTypes.array,
};
TableInfoShipment.propTypes = {
  shipment: PropTypes.array,
  status: PropTypes.array,
};
TableInfoDelivered.propTypes = {
  delivered: PropTypes.array,
  status: PropTypes.array,
};
TableInfoComplete.propTypes = {
  complete: PropTypes.array,
  status: PropTypes.array,
};
TableInfoCancel.propTypes = {
  cancel: PropTypes.array,
  status: PropTypes.array,
};
TableInfoReport.prototype = {
  report: PropTypes.array,
};
export {
  TableInfoUnconfirmed,
  TableInfoConfirmed,
  TableInfoShipment,
  TableInfoComplete,
  TableInfoDelivered,
  TableInfoCancel,
  TableInfoReport,
};
