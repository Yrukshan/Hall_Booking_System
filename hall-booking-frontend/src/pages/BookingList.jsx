import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const res = await API.get("/production/booking/get/all/bookings");
      setBookings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-booking?id=${id}`);
  };

  // ✅ VERIFY / CANCEL
  const updateStatus = async (id, status) => {
    try {
      await API.post("/production/booking/update/status", {
        id: id,
        status: status,
        updatedAt: new Date().toISOString(),
      });

      alert(status ? "Booking Verified" : "Booking Cancelled");

      loadBookings(); // refresh list
    } catch (error) {
      console.log(error);
      alert("Status update failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Booking List</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Purpose</th>
            <th>Participants</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.reservedDate}</td>
              <td>{b.bookingFor}</td>
              <td>{b.expectedParticipants}</td>

              <td style={{ color: b.status ? "green" : "red" }}>
                {b.status ? "APPROVED" : "CANCELLED"}
              </td>

              <td>
                {/* Update */}
                <button
                  onClick={() => handleUpdate(b.id)}
                  style={{ backgroundColor: "blue", color: "white", marginRight: "5px" }}
                >
                  Update
                </button>

                {/* Verify */}
                <button
                  onClick={() => updateStatus(b.id, true)}
                  style={{ backgroundColor: "green", color: "white", marginRight: "5px" }}
                >
                  Verify
                </button>

                {/* Cancel */}
                <button
                  onClick={() => updateStatus(b.id, false)}
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookingList;