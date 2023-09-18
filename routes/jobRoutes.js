const router = require("express").Router();
const jobController = require("../controllers/jobController");

router.route("/").post(jobController.createJob).get(jobController.getAllJob);
router
  .route("/:id")
  .get(jobController.getJob)
  .patch(jobController.UpdateJob)
  .delete(jobController.deleteJob);

module.exports = router;
