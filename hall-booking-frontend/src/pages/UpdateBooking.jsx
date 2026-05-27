import { useEffect, useState } from "react";
import API from "../api/axios";
import { useSearchParams } from "react-router-dom";

function UpdateBooking() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [booking, setBooking] = useState({
    id: "",
    reservedDate: "",
    startTime: "",
    endTime: "",
    bookingFor: "",
    expectedParticipants: "",
    specialRequirements: "",
    hall: { id: "" },
    requestedBy: { userId: "" },
    createdAt: "",
  });

  // GET BOOKING BY ID
  const loadBooking = async (bookingId) => {
    try {
      const res = await API.get(
        `/production/booking/get/one/${bookingId}`
      );
      setBooking(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) loadBooking(id);
  }, [id]);

  // normal fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setBooking({
      ...booking,
      [name]: value,
    });
  };

  // nested fields
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

  // UPDATE API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/production/booking/update", booking);
      alert("Booking Updated Successfully!");
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Update Booking</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          value={booking.id}
          readOnly
        />
        <br /><br />

        <input
          type="date"
          name="reservedDate"
          value={booking.reservedDate || ""}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="time"
          name="startTime"
          value={booking.startTime || ""}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="time"
          name="endTime"
          value={booking.endTime || ""}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="bookingFor"
          value={booking.bookingFor || ""}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="number"
          name="expectedParticipants"
          value={booking.expectedParticipants || ""}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="specialRequirements"
          value={booking.specialRequirements || ""}
          onChange={handleChange}
        />
        <br /><br />

        {/* Nested Hall */}
        <input
          type="text"
          name="id"
          value={booking.hall?.id || ""}
          onChange={(e) => handleNestedChange(e, "hall")}
          placeholder="Hall ID"
        />
        <br /><br />

        {/* Nested User */}
        <input
          type="text"
          name="userId"
          value={booking.requestedBy?.userId || ""}
          onChange={(e) => handleNestedChange(e, "requestedBy")}
          placeholder="User ID"
        />
        <br /><br />

        <button type="submit">
          Update Booking
        </button>

      </form>
    </div>
  );
}

export default UpdateBooking;