export const resFormatSuccess = (opt = {}) => {
  return {
    message: opt["message"] || "ok",
    code: opt["code"] || 0,
    result: opt["data"] || null,
    type: "success",
  };
};

export const resFormatError = (opt = {}) => {
  return {
    message: opt["message"] || "error",
    code: opt["code"] || -1,
    result: opt["data"] || null,
    type: "error",
  };
};
