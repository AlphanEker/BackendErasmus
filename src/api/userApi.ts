import {
  Request_user_create,
  Reply_user_create,
  Request_user_get,
} from "../defs";
import * as hasher from "fast-sha256";
import express from "express";
import * as users from "../classes/user";

//external globals
declare global {
  var allStudents: users.user[];
  var allCoordinators: users.user[];
  var allInstitituons: users.user[];
}

export async function api_create_student(
  req: express.Request,
  res: express.Response
) {
  try {
    const msg: Request_user_create = req.body;
    const now: string = Date();
    let newUser = new users.student(
      msg.name,
      msg.email,
      msg.password,
      now,
      true,
      msg.id
    );
    allStudents.push(newUser);
    let out: Reply_user_create = {
      id: msg.id,
    };
    res.json(out).status(200);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
}

export async function api_create_coordinator(
  req: express.Request,
  res: express.Response
) {
  try {
    const msg: Request_user_create = req.body;
    const now: string = Date();
    let newUser = new users.coordinator(
      msg.name,
      msg.email,
      msg.password,
      now,
      true,
      msg.id
    );
    allCoordinators.push(newUser);
    let out: Reply_user_create = {
      id: msg.id,
    };
    res.json(out).status(200);
  } catch (e) {
    return res.sendStatus(400);
  }
}
