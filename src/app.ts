import express from "express";
import cors from "cors";
import { File_get_response, Reply_user_create, Request_user_get } from "./defs";
import * as userApi from "./api/userApi";
import * as auth from "./api/authApi";
import * as role from "./api/roleApi";
import * as users from "./classes/user";
import * as files from "./classes/file";
import * as emails from "./classes/email";
import * as equreqs from "./classes/equReq";

const app = express();
const port = 3000;

// j: json
// b: binary
const routes = {
  auth_login: [auth.api_login, "j"],
  //auth_logout: [auth.api_logout, "j!"],

  user_create: [userApi.api_create_student, "j"],
  user_create_coor: [userApi.api_create_coordinator, "j"],

  //email_create: [email.api_create, "j!"],

  //role_get: [role.api_get, "j!"],
};

/*
app.get("/", (req, res) => {
  res.send("Hello World!");
});
*/
app.get("/form", (req, res) => {
  //res.send("Hello World!");
  let name: string = (req.query as any)._name;
  let role: string = (req.query as any)._role;
  try {
    if (role === "student") {
      let check: boolean = false;
      globalThis.allStudents.forEach(function (value: users.student) {
        if (value.name === name) {
          let ftbr: string[] = [];
          value.uploadedFiles.forEach(function (fileIter: files.file) {
            ftbr.push(fileIter.name);
          });
          let restbs = JSON.stringify(ftbr);
          res.json(restbs).status(200);
          check = true;
        }
      });
      if (!check) {
        throw new Error("");
      }
    } else if (role === "coordinator") {
      let check: boolean = false;
      allStudents.forEach(function (value: users.student) {
        if (value.name === name) {
          let ftbr: string[] = [];
          value.uploadedFiles.forEach(function (fileIter: files.file) {
            ftbr.push(fileIter.name);
          });
          let restbs = JSON.stringify(ftbr);
          res.json(restbs).status(200);
          check = true;
        }
      });
      if (!check) {
        throw new Error("");
      }
    }
  } catch (e) {
    return res.sendStatus(400);
  }
});

app.get("/to-do-list", (req, res) => {
  //res.send("Hello World!");
  let name: string = (req.query as any)._name;
  let role: string = (req.query as any)._role;
  try {
    if (role === "coordinator") {
      let check: boolean = false;
      allStudents.forEach(function (value: users.student) {
        if (value.name === name) {
          let ftbr: string[] = [];
          value.uploadedFiles.forEach(function (fileIter: files.file) {
            ftbr.push(fileIter.name);
          });
          let restbs = JSON.stringify(ftbr);
          res.json(restbs).status(200);
          check = true;
        }
      });
      if (!check) {
        throw new Error("");
      }
    }
  } catch (e) {
    return res.sendStatus(400);
  }
});

async function start() {
  let routeForJson = express.Router();
  routeForJson.use(express.json());

  let routeForFiles = express.Router();
  routeForFiles.use(express.raw());

  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });

  Object.entries(routes).forEach(([command, reqs]) => {
    const func = reqs[0] as any;
    const typ = reqs[1] as string;
    const isJson = typ.includes("j");
    const isProtected = typ.includes("!");
    const isBinary = !isJson;
    const path = "/api/" + command;
    console.log(path);
    if (isJson) {
      routeForJson.post(path, func);
    } else if (isBinary) {
      routeForFiles.post(path, func);
    }
  });
  globalThis.allStudents = [];
  globalThis.allCoordinators = [];
  globalThis.allInstitituons = [];
  app.use(cors());
  app.use("/", routeForJson);
  app.use("/", routeForFiles);
}

(() => {
  start();
})();

/**
 *
 */
