import { useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function AddHall() {
  const [hall, setHall] = useState({
    name: "",
    description: "",
    location: "",
    capacity: "",
    hasProjector: false,
    hasAc: false,
    hasWhiteboard: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setHall({
      ...hall,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await API.post("/production/hall/save", hall);

      alert("Hall Added Successfully!");
      console.log("Saved:", response.data);

      // reset form
      setHall({
        name: "",
        description: "",
        location: "",
        capacity: "",
        hasProjector: false,
        hasAc: false,
        hasWhiteboard: false,
      });

    } catch (error) {
      console.log(error);

      // Extract backend message safely
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Something went wrong";

      setError(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
        <Navbar />
      <h2>Add New Hall</h2>

      {/* ERROR DISPLAY */}
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>
           {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Hall Name"
          value={hall.name}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={hall.description}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={hall.location}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={hall.capacity}
          onChange={handleChange}
        />
        <br /><br />

        <label>
          <input
            type="checkbox"
            name="hasProjector"
            checked={hall.hasProjector}
            onChange={handleChange}
          />
          Projector
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            name="hasAc"
            checked={hall.hasAc}
            onChange={handleChange}
          />
          AC
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            name="hasWhiteboard"
            checked={hall.hasWhiteboard}
            onChange={handleChange}
          />
          Whiteboard
        </label>

        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Hall"}
        </button>

      </form>
    </div>
  );
}

export default AddHall;