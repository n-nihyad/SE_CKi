import axios from "axios";

const API = "http://localhost:3000/api/medicines";

// GET
export const getMedicines = (status: "active" | "deleted" | "all") => {
  return axios.get(API, {
    params: { status },
  });
};

// CREATE
export const createMedicine = (data: FormData) => {
  return axios.post(API, data);
};

// UPDATE
export const updateMedicine = (id: number, data: FormData) => {
  return axios.patch(`${API}/${id}`, data);
};

// DELETE
export const deleteMedicine = (id: number) => {
  return axios.patch(`${API}/${id}/delete`);
};

export const restoreMedicine = (id: number) => {
  return axios.patch(`${API}/${id}/restore`);
};
