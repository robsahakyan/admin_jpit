import API from "../utils/apis";

export const ACTION_TYPES = {
  MAP_CREATE: "MAP_CREATE",
  MAP_UPDATE: "MAP_UPDATE",
  MAP_DELETE: "MAP_DELETE",
  MAP_FETCH: "MAP_FETCH",
  MAP_FETCH_ALL: "MAP_FETCH_ALL",
  MAP_PAGINATION: "MAP_PAGINATION",
};

const formatingInput = input => {
  if (!Array.isArray(input.facilities))
    input.facilities = input.facilities.split(",");

  if (!Array.isArray(input.images)) input.images = input.images.split(",");

  for (const [index, facility] of input.facilities.entries()) {
    input.facilities[index] = facility
      .trim()
      .replace("\n", "")
      .replace(/'/g, "")
      .replace(/"/g, "");
  }

  for (const [index, image] of input.images.entries()) {
    input.images[index] = image
      .trim()
      .replace("\n", "")
      .replace(/'/g, "")
      .replace(/"/g, "");
  }

  return input;
};

export const fetchAll = () => dispatch => {
  API.map()
    .fetchAll()
    .then(res => {
      dispatch({
        type: ACTION_TYPES.MAP_FETCH_ALL,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};

export const Pagination = (
  page = 1,
  limit = 10,
  name = "",
  category = "all",
) => dispatch => {
  API.map()
    .fetchPagination(page, Math.abs(limit), name, category)
    .then(res => {
      dispatch({
        type: ACTION_TYPES.MAP_PAGINATION,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};

export const fetchById = (id, onSuccess) => dispatch => {
  API.map()
    .fetchById(id)
    .then(res => {
      dispatch({
        type: ACTION_TYPES.MAP_FETCH,
        payload: res.data,
      });
      onSuccess(res.data);
    })
    .catch(err => console.log(err));
};

export const create = (input, onSuccess) => dispatch => {
  const formattedData = formatingInput(input);
  API.map()
    .create(formattedData)
    .then(res => {
      dispatch({
        type: ACTION_TYPES.MAP_CREATE,
        payload: res.data,
      });
      onSuccess();
    })
    .catch(err => console.log(err));
};

export const update = (id, input, onSuccess) => dispatch => {
  const formattedData = formatingInput(input);
  API.map()
    .update(id, formattedData)
    .then(res => {
      dispatch({
        type: ACTION_TYPES.MAP_UPDATE,
        payload: res.data,
      });
      onSuccess();
    })
    .catch(err => console.log(err));
};

export const Delete = (id, onSuccess) => dispatch => {
  API.map()
    .delete(id)
    .then(res => {
      dispatch({
        type: ACTION_TYPES.MAP_DELETE,
        payload: res.data.id,
      });
      onSuccess();
    })
    .catch(err => console.log(err));
};
