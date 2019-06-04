import request from './request'

//用户注册
export const register = (params) => { return request('post', '/api/api/users/register', params) }

//用户登录
export const login = (params) => { return request('post', '/api/api/users/login', params) }

//test
export const test = () => { return request('get', '/api/api/users/test') }

//资金列表
export const profile = () => { return request('get', '/api/api/profiles') }

//用户列表
export const users = () => { return request('get', '/api/api/users') }

//删除用户
export const deleteUser = (id) => { return request('delete', `/api/api/users/delete/${id}`) }

//查询单个用户
export const queryUser = (id) => { return request('post', `/api/api/users/${id}`) }

//修改用户信息
export const updateUser = (id, params) => { return request('post', `/api/api/users/edit/${id}`, params) }

//编写文章
export const saveAritice = (params) => request('post','/api/api/aritice/save',params)

//读文章
export const aritices = ()=> request('get','/api/api/aritice')

//上传文件
export const upload = (params)=> request('post','/api/api/upload',params)