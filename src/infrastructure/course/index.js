import { get, post } from "../common/remote/base_api";


export const getCourseList = (page) => {
  return get(`/admin/get-allpost?page=${page}&limit=9`);
};
export const getAllCourseList = () => {
  return get(`/admin/get-all`);
};
export const createCourse = (params) => {
  return post(`/admin/create-course`,params);
};
export const onDelete = (params) => {
  return post(`/admin/delete-course`,params);
};