import request from "@/utils/request";

//用户注册
export const register = (params) => {
  return request("post", "/users/register", params);
};

//用户登录
export const login = (params) => {
  return request("post", "/users/login", params);
};

//用户列表
export const users = (params) => {
  return request("post", "/users", params);
};

//删除用户
export const deleteUser = (id) => {
  return request("delete", `/users/delete/${id}`);
};

//查询单个用户
export const queryUser = (id) => {
  return request("post", `/users/${id}`);
};

//修改用户信息
export const updateUser = (id, params) => {
  console.log(id);
  console.log(params);
  return request("post", `/users/edit/${id}`, params);
};

//编写文章

//上传文件
export const upload = (params) => request("post", "/upload", params);

//删除文件
export const imgDel = (params) => request("post", "/upload/delete", params);
