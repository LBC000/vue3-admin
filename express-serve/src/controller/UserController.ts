import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { resFormatError, resFormatSuccess } from "../utils/util";
import { generateHash, verifyHash } from "../utils/encryptionUtils";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    let resData = await this.userRepository.find();
    return resFormatSuccess({ data: resData });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;

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

    if (count === 0) {
      let passwordHash = await generateHash(request.body.password, 10);

      let verifyHashRes = await verifyHash(request.body.password, passwordHash);

      console.log(count, request.body, verifyHashRes, "数量1");

      let user = new User();
      user.username = request.body.username;
      user.password = passwordHash;
      user.nickname = generateId();

      let res;

      res = await this.userRepository.save(user);

      if (res) {
        return resFormatSuccess();
      } else {
        return resFormatError({ msg: "注册失败" });
      }
    } else {
      return resFormatError({ msg: "超级管理员已注册" });
    }

    // 生成8个数字的随机id
    function generateId() {
      let id = "";
      for (let i = 0; i < 8; i++) {
        id += Math.floor(Math.random() * 10);
      }
      return id;
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;

    let userToRemove = await this.userRepository.findOneBy({ id });

    if (!userToRemove) {
      return "this user not exist";
    }

    await this.userRepository.remove(userToRemove);

    return "user has been removed";
  }
}
