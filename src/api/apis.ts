import { defHttp } from "/@/utils/http/axios";
import { ErrorMessageMode } from "/#/axios";

// import {  } from "/@/api/apis";

enum Api {
  registerSuperAdmin = "/registerSuperAdmin",
  addDept = "/addDept",
  deleteDept = "/deleteDept",
}

export function registerSuperAdmin(params, mode: ErrorMessageMode = "message") {
  return defHttp.post(
    { url: Api.registerSuperAdmin, params },
    { errorMessageMode: mode, successMessageMode: "message" }
  );
}

export function addDept(params, mode: ErrorMessageMode = "message") {
  return defHttp.post(
    { url: Api.addDept, params },
    { errorMessageMode: mode, successMessageMode: "message" }
  );
}

export function deleteDept(params, mode: ErrorMessageMode = "message") {
  return defHttp.post(
    { url: Api.deleteDept, params },
    { errorMessageMode: mode, successMessageMode: "message" }
  );
}
