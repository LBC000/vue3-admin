export const resFormatSuccess = (opt = {}) => {
  return {
    message: opt["msg"] || "ok",
    code: opt["code"] ?? 0,
    result: opt["data"] ?? "ok",
    type: "success",
  };
};

export const resFormatError = (opt = {}) => {
  return {
    message: opt["msg"] || "error",
    code: opt["code"] || -1,
    result: opt["data"] || "error",
    type: "error",
  };
};
