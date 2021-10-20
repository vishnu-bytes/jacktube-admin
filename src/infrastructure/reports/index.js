import { get, post } from "../common/remote/base_api";

export const reportData = (params) =>
  post("https://zoom-api-2021.herokuapp.com/payments/", params);
export const allPayments = (params) =>
  get("https://zoom-api-2021.herokuapp.com/v1/allpayments");
