/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import backend_url from "../helpers/api";

const http = axios.create({
  baseURL: backend_url,
});

const token  = localStorage.getItem("token");
export const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export default {
  auth(url = "") {
    return {
      login: ({ email, password }) =>
        http.post(url + "/login", { email, password }),
      register: ({ email, name, password }) =>
        http.post(url + "/register", { email, name, password }),
    };
  },

  map(url = "course") {
    const config = {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    return {
      fetchAll: () => http.get(url + "/list", config),
      fetchPagination: (page, limit, name, category) =>
        http.get(
          url +
            "?page=" +
            page +
            "&limit=" +
            limit +
            "&name=" +
            name +
            "&category=" +
            category,
          config
        ),
      fetchById: (id) => http.get(url + "/" + id, config),
      create: (newRecord) => http.post(url, newRecord, config),
      update: (id, updatedRecord) =>
        http.put(url + "/" + id, updatedRecord, config),
      delete: (id) => http.delete(url + "/" + id, config),
    };
  },

  user(url = "user") {
    const config = {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    return {
      fetchAll: () => http.get(url + "/list", config),
      fetchPagination: (page, limit = 10, name = null, email = null) =>
        http.get(
          url +
            "?page=" +
            page +
            "&limit=" +
            limit +
            "&name=" +
            name +
            "&email=" +
            email,
          config
        ),
      fetchById: (id) => http.get(url + "/" + id, config),
      create: (newRecord) => http.post(url, newRecord, config),
      update: (id, updatedRecord) =>
        http.put(url + "/" + id, updatedRecord, config),
      delete: (id) => http.delete(url + "/" + id, config),
    };
  },
};
