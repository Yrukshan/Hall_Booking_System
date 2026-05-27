import API from "../api/axios";

// Create
export const saveBooking = async (data) => {
  return await API.post("/production/booking/save", data);
};

// Get All Bookings
export const getAllBookings = async () => {
  return await API.get("/production/booking/get/all/bookings");
};

// Get Booking By ID 
export const getBookingById = async (id) => {
  return await API.get(`/production/booking/get/one/${id}`);
};

// Update Booking
export const updateBooking = async (data) => {
  return await API.post("/production/booking/update", data);
};

// Cancel / Update Status (optional but very good for exam)
export const updateBookingStatus = async (data) => {
  return await API.post("/production/booking/update/status", data);
};