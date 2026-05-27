import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AddHall from "./pages/AddHall";
import HallList from "./pages/HallList";
import AddBooking from "./pages/AddBooking";
import UpdateHall from "./pages/UpdateHall";
import UpdateBooking from "./pages/UpdateBooking";
import BookingList from "./pages/BookingList";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/add-hall" element={<AddHall />} />

        <Route path="/hall-list" element={<HallList />} />

        <Route path="/add-booking" element={<AddBooking />} />

        <Route path="/update-hall" element={<UpdateHall />} />

        <Route path="/update-booking" element={<UpdateBooking />} />

        <Route path="/booking-list" element={<BookingList />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;