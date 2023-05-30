export const resFormatSuccess = (opt = {}) => {
  return {
    message: opt["message"] || "ok",
    code: opt["code"] || "0",
    result: opt["data"] || null,
    type: "success",
  };
};
