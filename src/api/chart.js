import request from "@/utils/request";

export const getTags = () => {
  return request("get", "/chart/tag");
};

export const getAritices = () => {
  return request("get", "/chart/aritice");
};
