import axios from "axios";
// import config from "../../../common/config";

const baseURL = process.env.REACT_APP_BASE_API;

var token = sessionStorage.getItem("token");

const base = (options, headerOptions) => {
  return axios({
    baseURL,
    headers: {
      Accept: "application/json",
      auth:{
        username:"rzp_test_Tjcrk8qFuhRupU",
        password:"hOMkRg2WacfhUQqZKL663nAG"
      },
      ...headerOptions,
    },
    ...options,
  }).then((res) => res.data);
};

export const get = (url, params) => {
  const options = {
    method: "get",
    url,
    params,
  };
  return base(options);
};

export const patch = (url, data) => {
  const options = {
    method: "patch",
    url,
    data,
  };
  return base(options);
};

export const post = (url, data, headerOptions) => {
  const options = {
    method: "post",
    url,
    data,
  };
  return base(options, headerOptions);
};

export const put = (url, data) => {
  const options = {
    method: "put",
    url,
    data,
  };
  return base(options);
};

export const del = (url, data) => {
  const options = {
    method: "delete",
    url,
    data,
  };
  return base(options);
};
