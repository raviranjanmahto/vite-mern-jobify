const router = require("express").Router();
const jobController = require("../controllers/jobController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware.protect);

router
  .route("/")
  .post(authMiddleware.testUser, jobController.createJob)
  .get(jobController.getAllJob);
router
  .route("/:id")
  .get(jobController.getJob)
  .patch(authMiddleware.testUser, jobController.UpdateJob)
  .delete(authMiddleware.testUser, jobController.deleteJob);

module.exports = router;
