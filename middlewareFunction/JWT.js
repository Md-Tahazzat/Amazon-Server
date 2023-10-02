const jwt = require("jsonwebtoken");

const verifyJWT = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send({
      error: "Invalid access token",
      message:
        "The provided access token is invalid or has expired. Please log in again.",
    });
  }
  const decodedEmail = jwt.verify(token, process.env.SECRET_KEY);
  if (!decodedEmail) {
    return res.status(401).send({
      error: "invalid_token",
      message: "The access token is invalid or has expired.",
    });
  }

  req.decodedEmail = decodedEmail;
  next();
};

module.exports = verifyJWT;
