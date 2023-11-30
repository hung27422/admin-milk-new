import PropTypes from "prop-types";
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
  return formattedDate;
}
function DateOrders({ data }) {
  const dateString = data?.date;
  const newDate = new Date(dateString);
  return <span>{formatDate(newDate)}</span>;
}

export default DateOrders;
DateOrders.propTypes = {
  data: PropTypes.string,
};
