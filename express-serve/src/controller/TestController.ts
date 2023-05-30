import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";

import { resFormatSuccess } from "../utils/util";

export class TestController {
  // private userRepository = AppDataSource.getRepository(User);

  async getList(request: Request, response: Response, next: NextFunction) {
    return resFormatSuccess({ data: 123 });
  }
}
