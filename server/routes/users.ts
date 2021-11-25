import { Router, Request, Response } from "express";
const bcrypt = require("bcrypt");
const users = Router();
const User = require("../models/user");
const { createTokens, validateToken } = require("../src/JWT");

users.get("/", validateToken, (req: Request, res: Response) => {
  User.find({}).then((data: object[]) => {
    res.status(200).send(data);
  });
});

users.post("/register", (req: Request, res: Response) => {
  const { username, password } = req.body;
  // if (password.length < 6)
  //   return res.status(400).send({ type: "error", message: "password needs to be" });
  bcrypt.hash(password, 10).then((hash: HashAlgorithmIdentifier) => {
    User.create({
      username: username,
      password: hash,
    })
      .then(() => {
        res.status(200).redirect("/");
      })
      .catch((err: Error) => {
        if (err) {
          res.status(400).json({ error: err });
        }
      });
  });
});

users.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (!user) return res.status(400).send({ error: "User Doesn't Exist" });

  const dbPassword = user.password;
  bcrypt.compare(password, dbPassword).then((match: any) => {
    if (!match) {
      res
        .status(400)
        .send({ error: "Wrong Username and Password Combination!" });
    } else {
      const accessToken = createTokens(user);

      // res.cookie("access-token", accessToken, {
      //   maxAge: 60 * 60 * 24 * 30 * 1000,
      //   httpOnly: true,
      // });

      const result = {
        user: user,
        accessToken: accessToken,
      };
      res.json(result);
    }
  });
});

users.delete("/:id", (req: Request, res: Response) => {
  const ID = req.params.id;
  if (!ID) res.status(400).send(`ERROR: Not give id`);
  User.deleteOne({ id: ID })
    .then(() => {
      res.status(204).redirect("/api/users");
    })
    .catch(() => {
      res.status(404).send(`ERROR: ID -> ${ID} was not found!`);
    });
});

module.exports = users;
