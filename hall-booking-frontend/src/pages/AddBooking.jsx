import { useState } from "react";
import API from "../api/axios";

function AddBooking() {
  const [booking, setBooking] = useState({
    reservedDate: "",
    startTime: "",
    endTime: "",
    bookingFor: "",
    expectedParticipants: "",
    specialRequirements: "",
    hall: {
      id: "",
    },
    requestedBy: {
      userId: "",
    },
    createdAt: "",
  });

  // handle normal fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setBooking({
      ...booking,
      [name]: value,
    });
  };

  // handle nested fields
  const handleNestedChange = (e, parent) => {
    const { name, value } = e.target;

    setBooking({
      ...booking,
      [parent]: {
        ...booking[parent],
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/production/booking/save", booking);
      alert("Booking Created Successfully!");
      console.log(booking);
    } catch (error) {
      console.log(error);
      alert("Booking Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Booking</h2>

      <form onSubmit={handleSubmit}>

        {/* Reserved Date */}
        <input
          type="date"
          name="reservedDate"
          onChange={handleChange}
        />
        <br /><br />

        {/* Start Time */}
        <input
          type="time"
          name="startTime"
          onChange={handleChange}
        />
        <br /><br />

        {/* End Time */}
        <input
          type="time"
          name="endTime"
          onChange={handleChange}
        />
        <br /><br />

        {/* Booking For */}
        <input
          type="text"
          name="bookingFor"
          placeholder="Booking Purpose"
          onChange={handleChange}
        />
        <br /><br />

        {/* Expected Participants */}
        <input
          type="number"
          name="expectedParticipants"
          placeholder="Participants"
          onChange={handleChange}
        />
        <br /><br />

        {/* Special Requirements */}
        <input
          type="text"
          name="specialRequirements"
          placeholder="Special Requirements"
          onChange={handleChange}
        />
        <br /><br />

        {/* Hall ID (nested) */}
        <input
          type="text"
          name="id"
          placeholder="Hall ID"
          onChange={(e) => handleNestedChange(e, "hall")}
        />
        <br /><br />

        {/* Requested By (nested) */}
        <input
          type="text"
          name="userId"
          placeholder="User ID"
          onChange={(e) => handleNestedChange(e, "requestedBy")}
        />
        <br /><br />

        {/* Created At */}
        <input
          type="datetime-local"
          name="createdAt"
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">
          Create Booking
        </button>

      </form>
    </div>
  );
}

export default AddBooking;