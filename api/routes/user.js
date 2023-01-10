const userController = require("../controllers/userController");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.get("/", verifyToken, userController.getAllUsers);
//UPDATE USER
router.put("/:id", verifyToken, userController.updateUser);
//GET A USER
router.get("/:id", userController.getAUser);
//DELETE USER
router.delete("/:id", verifyTokenAndUserAuthorization, userController.deleteUser);

module.exports = router;