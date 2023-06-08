import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { resFormatError, resFormatSuccess } from "../utils/util";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    let resData = await this.userRepository.find();
    return resFormatSuccess({ data: resData });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      return "unregistered user";
    }
    return user;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { firstName, lastName, age } = request.body;

    const user = Object.assign(new User(), {
      firstName,
      lastName,
      age,
    });

    return this.userRepository.save(user);
  }

  // 注册超级管理员
  async registerSuperAdmin(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { firstName, lastName, age } = request.body;
    let count = await this.userRepository.count();

    return resFormatSuccess();

    console.log(count, "数量1");
    if (count === 0) {
      const user = Object.assign(new User(), {
        firstName,
        lastName,
        age,
      });

      let res;

      // res = await this.userRepository.save(user);

      if (res) {
        return resFormatSuccess();
      } else {
        return resFormatError();
      }
    } else {
      return resFormatError();
    }

    return resFormatSuccess({ data: count });
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let userToRemove = await this.userRepository.findOneBy({ id });

    if (!userToRemove) {
      return "this user not exist";
    }

    await this.userRepository.remove(userToRemove);

    return "user has been removed";
  }
}
