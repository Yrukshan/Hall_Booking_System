import API from "../api/axios";

export const saveHall = async (data) => {
  return await API.post("/production/hall/save", data);
};

export const getAllHalls = async () => {
  return await API.get("/production/hall/get/all/active");
};

export const getHallById = async (id) => {
  return await API.get(`/production/hall/get/one/${id}`);
};

export const updateHall = async (data) => {
  return await API.post("/production/hall/update", data);
};