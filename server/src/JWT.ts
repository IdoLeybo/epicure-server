import { NextFunction, Response } from "express";

const { sign, verify } = require("jsonwebtoken");
const secretToken = process.env.TOKEN_SECRET;

const createTokens = (user: any) => {
  const accessToken = sign(
    { username: user.username, id: user.id },
    secretToken,
    { expiresIn: "1h" }
  );
  return accessToken;
};

const validateToken = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // const accessToken = req.cookies["access-token"];
  if (!token) return res.status(401).json({ error: "User not Authenticated!" });
  try {
    verify(token, secretToken, (err: Error, user: any) => {
      if (err)
        return res
          .status(403)
          .send({ type: "error", message: "Token passed expired" });
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { createTokens, validateToken };
