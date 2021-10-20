import { get, post, del } from "../common/remote/base_api";

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
export const onCreateWebinar = (params) => {
  return post("https://zoom-api-2021.herokuapp.com/webinar/create", params);
};
export const deleteZoom = (params) => {
  console.log(params, "delete");
  return del(`https://zoom-api-2021.herokuapp.com/webinar/${params}`, params);
};
