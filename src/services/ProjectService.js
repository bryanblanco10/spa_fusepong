import { axios, API_ROUTES } from "@/config/index.js";

export default {
  async get(uuid) {
    let result = await axios.get(`${API_ROUTES.project.get}/${uuid}`);

    return result;
  },

  async save(data) {
    let result = await axios.post(`${API_ROUTES.project.save}`, data);

    return result;
  },

  async delete(id, data) {
    let result = await axios.delete(`${API_ROUTES.project.delete}/${id}`, data);

    return result;
  },

  async update(id, data) {
    let result = await axios.put(
      `${API_ROUTES.project.update}/${id}`,
      data
    );

    return result;
  },
};