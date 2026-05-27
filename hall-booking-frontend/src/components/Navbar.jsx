import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div
      style={{
        backgroundColor: "black",
        padding: "15px",
      }}
    >
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/hall-list" style={linkStyle}>Halls</Link>
      <Link to="/booking-list" style={linkStyle}>Bookings</Link>
      <Link to="/add-hall" style={linkStyle}>Add Hall</Link>
      <Link to="/add-booking" style={linkStyle}>Add Booking</Link>
    </div>
  );
}

const linkStyle = {
  color: "white",
  marginRight: "20px",
  textDecoration: "none",
};

export default Navbar;