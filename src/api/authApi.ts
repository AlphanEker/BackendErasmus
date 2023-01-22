import jwt from "jsonwebtoken";
//import { Request_jwt_extension, Jwt_extension } from "../defs";
import express from "express";
import { user } from "../classes/user";
import * as userApi from "./userApi";

export async function api_login(req: express.Request, res: express.Response) {
  try {
    const name = req.body.username;
    const password: string = req.body.password;
    let __name: string = "";
    let __role: string = "";

    if (!name || !password) {
      throw new Error("");
    }
    allStudents.forEach(function (value: user) {
      if (value.name === name && value.password === password) {
        __name = value.name;
        __role = "student";
      }
    });
    allCoordinators.forEach(function (value: user) {
      if (value.name === name && value.password === password) {
        __name = value.name;
        __role = "coordinator";
      }
    });
    allInstitituons.forEach(function (value: user) {
      if (value.name === name && value.password === password) {
        __name = value.name;
        __role = "inst";
      }
    });
    if (__name === "") {
      throw new Error("nonFoundUser");
    }

    res.json({
      _name: __name,
      _role: __role,
    });
  } catch (e) {
    res.sendStatus(500);
  }
}
export function checkToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  next();
  // Get auth token
  /*
  let token: string;
  try {
    const secret = "cs319";
    if (secret === undefined) throw 401;

    if (req.headers.authorization === undefined) throw 401;
    const splitted: string[] = req.headers.authorization.split(" ");
    if (splitted[0].toLowerCase() !== "bearer") throw 401;
    token = splitted[1];

    jwt.verify(token, secret, (err, payload) => {
      if (err) return res.sendStatus(403);
      (req as Request_jwt_extension).jwtExt = payload as Jwt_extension;
      next();
    });
  } catch (e) {
    return res.sendStatus(401);
  }
  */
}
