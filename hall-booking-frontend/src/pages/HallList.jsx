import { useEffect, useState } from "react";
import { getAllHalls } from "../services/hallService";
import { useNavigate } from "react-router-dom";

function HallList() {
  const [halls, setHalls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadHalls();
  }, []);

  const loadHalls = async () => {
    try {
      const res = await getAllHalls();
      setHalls(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-hall?id=${id}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Hall List</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Location</th>
            <th>Capacity</th>
            <th>Projector</th>
            <th>AC</th>
            <th>Whiteboard</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {halls.map((hall) => (
            <tr key={hall.id}>
              <td>{hall.id}</td>
              <td>{hall.name}</td>
              <td>{hall.description}</td>
              <td>{hall.location}</td>
              <td>{hall.capacity}</td>

              <td>{hall.hasProjector ? "YES" : "NO"}</td>
              <td>{hall.hasAc ? "YES" : "NO"}</td>
              <td>{hall.hasWhiteboard ? "YES" : "NO"}</td>

              <td style={{ color: hall.status ? "green" : "red" }}>
                {hall.status ? "ACTIVE" : "INACTIVE"}
              </td>

              <td>
                <button
                  onClick={() => handleUpdate(hall.id)}
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    padding: "5px 10px",
                  }}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HallList;