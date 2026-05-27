import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        fontFamily: "Arial",
      }}
    >
      <h1>Hall Booking System</h1>

      <p>
        Welcome to the Hall Booking Management System
      </p>

      <div style={{ marginTop: "30px" }}>

        <Link to="/login">
          <button style={buttonStyle}>Login</button>
        </Link>

        <Link to="/add-hall">
          <button style={buttonStyle}>Add Hall</button>
        </Link>

        <Link to="/hall-list">
          <button style={buttonStyle}>Hall List</button>
        </Link>

        <Link to="/add-booking">
          <button style={buttonStyle}>Add Booking</button>
        </Link>

        <Link to="/booking-list">
          <button style={buttonStyle}>Booking List</button>
        </Link>

      </div>
    </div>
  );
}

const buttonStyle = {
  margin: "10px",
  padding: "12px 20px",
  backgroundColor: "blue",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
};

export default Home;