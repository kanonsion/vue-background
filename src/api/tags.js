import request from "@/utils/request";

export const getList = () => {
  return request("get", "/tag");
};

export const getListAll = (params) => {
  return request("post", "/tag/list", params);
};

export const tagDelete = (id) => {
  return request("get", `/tag/delete/${id}`);
};

export const tagAdd = (params) => {
  return request("post", "/tag/add", params);
};

export const tagEdit = (id, params) => {
  return request("post", `/tag/edit/${id}`, params);
};
