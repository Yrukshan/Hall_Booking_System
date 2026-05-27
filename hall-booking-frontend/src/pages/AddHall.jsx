import { useState } from "react";
import API from "../api/axios";

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

  // handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setHall({
      ...hall,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/production/hall/save", hall);
      console.log("Saved:", response.data);

      alert("Hall Added Successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to add hall");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Hall</h2>

      <form onSubmit={handleSubmit}>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Hall Name"
          value={hall.name}
          onChange={handleChange}
        />
        <br /><br />

        {/* Description */}
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={hall.description}
          onChange={handleChange}
        />
        <br /><br />

        {/* Location */}
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={hall.location}
          onChange={handleChange}
        />
        <br /><br />

        {/* Capacity */}
        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={hall.capacity}
          onChange={handleChange}
        />
        <br /><br />

        {/* Checkboxes */}
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

        <button type="submit">
          Add Hall
        </button>
      </form>
    </div>
  );
}

export default AddHall;