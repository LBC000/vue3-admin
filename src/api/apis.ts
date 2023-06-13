import { defHttp } from "/@/utils/http/axios";

import { ErrorMessageMode } from "/#/axios";

enum Api {
  registerSuperAdmin = "/registerSuperAdmin",
}

export function registerSuperAdmin(params, mode: ErrorMessageMode = "message") {
  return defHttp.post(
    { url: Api.registerSuperAdmin, params },
    { errorMessageMode: mode, successMessageMode: "message" }
  );
}
