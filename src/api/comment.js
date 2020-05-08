import request from "@/utils/request";

export const getTags = () => {
  return request("get", "/comment/aritice");
};

export const getList = (params) => {
  return request("post", `/comment/list`, params);
};

export const del = (id, params) => {
  return request("post", `/comment/del/${id}`, params);
};
