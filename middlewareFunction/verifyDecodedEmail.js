const verifyDecodedEmail = async (req, res, next) => {
  const email = req.body?.email;
  const decodedEmail = req.decodedEmail;
  if (email !== decodedEmail) {
    return res.status(403).send({
      error: "forbidden",
      message: "The provided email is not authorized for this operation.",
    });
  }

  next();
};

module.exports = verifyDecodedEmail;
