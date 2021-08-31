import { get, post } from "../common/remote/base_api";

export const onSubmit = (params) => {
  return post("/admin/create-event", params);
};
export const getAllEvents = () => {
  return get("/admin/get-allEvents");
};
