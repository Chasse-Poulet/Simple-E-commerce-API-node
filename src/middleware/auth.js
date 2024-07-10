const jwt = require("jsonwebtoken");
const UserService = require("../modules/users/user.service");

async function authenticateToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await UserService.getUserById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: "User not found !" });
    }

    req.user = {
      id: user._id,
      isAdmin: user.isAdmin,
    };

    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication failed !" });
  }
}

function authorizeSelfOrAdmin(req, res, next) {
  if (req.user.id === req.params.userId || req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ error: "You are not authorized to do this !" });
  }
}

function authorizeAdmin(req, res, next) {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ error: "You are not admin !" });
  }
}

module.exports = {
  authenticateToken,
  authorizeSelfOrAdmin,
  authorizeAdmin,
};
