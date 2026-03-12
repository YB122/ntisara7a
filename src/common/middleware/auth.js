import jwt from "jsonwebtoken";
export const auth = (req, res, next) => {
  let { authorization } = req.headers;
  let [bearer, token] = authorization.split(" ");
  let signature = "";
  switch (bearer) {
    case "admin":
      signature = "signatureAdmin";
      break;
    case "user":
      signature = "signatureUser";
      break;
  }
  let decode = jwt.verify(token, signature);
  req.user = decode;
  next();
};

export const generateToken = (userSearch) => {
  let signature = "";
  switch (userSearch.role) {
    case "admin":
      signature = "signatureAdmin";
      break;
    case "user":
      signature = "signatureUser";
      break;
  }
  return jwt.sign({ _id: userSearch._id }, signature);
};
