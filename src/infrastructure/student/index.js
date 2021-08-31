import { get, post } from "../common/remote/base_api";

export const onSubmit = (params) => {
  return post("/admin/add-student", params, {
    "Content-Type": "multipart/form-data",
  });
};
export const getStudentList = () => {
  return get("/admin/get-allStudent");
};
export const onDelete = (params) => {
  return post("/admin/delete-student", params);
};
export const onEdit = (params) => {
  return post("/admin/add-student", params);
};
