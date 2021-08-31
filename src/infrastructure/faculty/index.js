import { get, post } from "../common/remote/base_api";

export const onSubmit = (params) => {
  return post("/admin/add-faculty", params);
};

export const getFacultyList = () => {
  return get("/admin/get-allfaculty");
};

export const onDelete = (params) => {
  return post("/admin/delete-faculty", params);
};
export const onEdit = (params) => {
  return post("/admin/add-faculty", params);
};
