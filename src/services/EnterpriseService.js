import { axios, API_ROUTES } from "@/config/index.js";

export default {
  async get() {
    let result = await axios.get(`${API_ROUTES.enterprise.get}`);

    return result;
  },

  async save(data) {
    let result = await axios.post(`${API_ROUTES.enterprise.save}`, data);

    return result;
  },

  async delete(id) {
    let result = await axios.delete(`${API_ROUTES.enterprise.delete}/${id}`);

    return result;
  },

  async update(id, data) {
    let result = await axios.put(
      `${API_ROUTES.enterprise.update}/${id}`,
      data
    );

    return result;
  },
};