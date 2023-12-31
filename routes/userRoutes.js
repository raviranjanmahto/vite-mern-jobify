const router = require("express").Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.use(authMiddleware.protect);
router.get("/profile", userController.getCurrentUser);
router.patch(
  "/updateUser",
  authMiddleware.testUser,
  userController.uploadUserAvatar,
  userController.resizeUserAvatar,
  userController.updateUser
);
router.get(
  "/admin/applicationStats",
  authController.restrictTo("admin"),
  userController.applicationStats
);

module.exports = router;
