import { useEffect, useState } from "react";
import { getHallById, updateHall } from "../services/hallService";
import { useSearchParams } from "react-router-dom";

function UpdateHall() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [hall, setHall] = useState({
    id: "",
    name: "",
    description: "",
    location: "",
    capacity: "",
    hasProjector: false,
    hasAc: false,
    hasWhiteboard: false,
    status: true,
  });

  // GET BY ID
  const loadHall = async (hallId) => {
    try {
      const res = await getHallById(hallId);

      setHall({
        ...res.data,
        hasProjector: !!res.data.hasProjector,
        hasAc: !!res.data.hasAc,
        hasWhiteboard: !!res.data.hasWhiteboard,
        status: !!res.data.status,
      });
    } catch (error) {
      console.log(error);
      alert("Hall not found");
    }
  };

  useEffect(() => {
    if (id) {
      loadHall(id);
    }
  }, [id]);

  // handle input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setHall({
      ...hall,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateHall(hall);
      alert("Hall Updated Successfully!");
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Update Hall</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="id"
          value={hall.id || ""}
          readOnly
        />
        <br /><br />

        <input
          type="text"
          name="name"
          value={hall.name || ""}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="description"
          value={hall.description || ""}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="location"
          value={hall.location || ""}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="number"
          name="capacity"
          value={hall.capacity || ""}
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

        <br />

        <label>
          <input
            type="checkbox"
            name="status"
            checked={hall.status}
            onChange={handleChange}
          />
          Active
        </label>

        <br /><br />

        <button type="submit">
          Update Hall
        </button>

      </form>
    </div>
  );
}

export default UpdateHall;