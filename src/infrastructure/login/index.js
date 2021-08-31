import { post } from "../common/remote/base_api";

export const onLogin = (params) => {
  return post("/auth/admin-login", params);
};
