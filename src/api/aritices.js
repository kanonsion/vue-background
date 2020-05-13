import request from "@/utils/request";

export const ariticeList = (params) => {
  return request("post", "/aritice/list", params);
};

export const ariticeSave = (params) => {
  return request("post", "/aritice/save", params);
};

export const ariticeEdit = (id, params) => {
  return request("post", `/aritice/edit/${id}`, params);
};

export const ariticeDelete = (id) => {
  return request("get", `/aritice/delete/${id}`);
};

//审核
export const auditing = (params) => {
  return request("post", `/aritice/auditing`, params);
};
