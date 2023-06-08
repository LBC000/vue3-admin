import HttpStatus from "http-status-codes";
import express from "express";

/**
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 */
export function formatErrorMessageHandler(
  err,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  // console.log(req, res, "错误了1");
  console.log(res, "格式化1");

  next();
}
