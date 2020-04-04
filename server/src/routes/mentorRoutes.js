import express from "express";
import auth from "../middleware/auth";
import mentorController from "../controllers/mentorController";
import accessControl from "../middleware/accessControl";

const {
  addMentor,
  getMentors,
  removeMentor,
  getMentorSkills
} = mentorController;

const router = express.Router();

router.post(
  "/:role",
  auth,
  accessControl.grantAccess("createOwn", "mentor"),
  addMentor
);

router.get(
  "/:role",
  auth,
  accessControl.grantAccess("readAny", "mentor"),
  getMentors
);
router.get("/:mentor_id/skills", getMentorSkills);

router.delete(
  "/:mentor_id/:role",
  auth,
  accessControl.grantAccess("deleteAny", "mentor"),
  removeMentor
);

export default router;
