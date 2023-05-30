import { defHttp } from "/@/utils/http/axios";
import { getMenuListResultModel } from "./model/menuModel";

enum Api {
  GetMenuList = "/getMenuList",
  GetMenuListV2 = "/getMenuListV2",
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
};

export const getMenuListV2 = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuListV2 });
};
