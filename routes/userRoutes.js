const router = require("express").Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.use(authMiddleware.protect);
router.get("/profile", userController.getCurrentUser);
router.patch("/updateUser", userController.updateUser);
router.get(
  "/applicationStats",
  authController.restrictTo("admin"),
  userController.applicationStats
);

module.exports = router;
