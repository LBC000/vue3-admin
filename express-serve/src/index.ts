import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";

const router = express.Router();
const { celebrate, Joi, Segments } = require("celebrate");

import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

import { Routes } from "./routes";
import joiErrorHandler from "./middlewares/joiErrorHandler";
import { formatErrorMessageHandler } from "./middlewares/formatErrorMessage";

// import indexRoute from "./routes/index.route";

// create express app
const app = express();
app.use(bodyParser.json());

// register express routes from defined application routes
let api_base_url = "/api";

Routes.forEach((route) => {
  (app as any)[route.method](
    `${api_base_url}${route.route}`,
    route["celebrate"] ||
      celebrate({
        [Segments.QUERY]: {},
      }),
    (req: Request, res: Response, next: Function) => {
      const result = new (route.controller as any)()[route.action](
        req,
        res,
        next
      );
      if (result instanceof Promise) {
        result.then((result) => {
          // console.log(result, "返回前");
          if (result.code == -1) {
            return res.status(400).send(result);
          }

          return result !== null && result !== undefined
            ? res.send(result)
            : undefined;
        });
      } else if (result !== null && result !== undefined) {
        res.json(result);
      }
    }
  );
});

// router.get(
//   "/getList",
//   celebrate({
//     [Segments.QUERY]: {
//       id: Joi.string(),
//     },
//   }),
//   async (req, res) => {
//     return 123;
//   }
// );

// 中间件开始
// app.use(formatErrorMessageHandler);

// Joi Error Handler
app.use(joiErrorHandler);
// 中间件结束

app.listen(3109);

console.log(
  "Express server has started on port 3109. Open http://localhost:3109/ to see results"
);

AppDataSource.initialize()
  .then(async () => {
    // Router
    // app.use("/api", indexRoute);
    // setup express app here
    // ...
    // start express server
    // insert new users for test
    // await AppDataSource.manager.save(
    //   AppDataSource.manager.create(User, {
    //     firstName: "Timber",
    //     lastName: "Saw",
    //     age: 27,
    //   })
    // );
    // await AppDataSource.manager.save(
    //   AppDataSource.manager.create(User, {
    //     firstName: "Phantom",
    //     lastName: "Assassin",
    //     age: 24,
    //   })
    // );
  })
  .catch((error) => console.log(error));
