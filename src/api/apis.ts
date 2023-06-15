import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';

// import {  } from "/@/api/apis";

enum Api {
  registerSuperAdmin = '/registerSuperAdmin',
  addDept = '/addDept',
  deleteDept = '/deleteDept',
  addOrEditMenu = '/system/addOrEditMenu',
}

export function registerSuperAdmin(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    { url: Api.registerSuperAdmin, params },
    { errorMessageMode: mode, successMessageMode: 'message' },
  );
}

export function addDept(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    { url: Api.addDept, params },
    { errorMessageMode: mode, successMessageMode: 'message' },
  );
}

export function deleteDept(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    { url: Api.deleteDept, params },
    { errorMessageMode: mode, successMessageMode: 'message' },
  );
}

export function addOrEditMenu(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    { url: Api.addOrEditMenu, params },
    { errorMessageMode: mode, successMessageMode: 'message' },
  );
}
