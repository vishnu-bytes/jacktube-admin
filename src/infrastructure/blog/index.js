import { get,post} from "../common/remote/base_api";

export const onClick = (page) => {
    return get(`/admin/get-allblogs?page=${page}&limit=8`);
};

export const onSubmit = (params) => {
  return post("/admin/add-blogs", params);
};