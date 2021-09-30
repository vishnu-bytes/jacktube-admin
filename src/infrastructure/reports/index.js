import { get, post } from "../common/remote/base_api";


export const reportData = (params) => post("/payments/", params);
export const allPayments = (params) => get("/allpayments");

