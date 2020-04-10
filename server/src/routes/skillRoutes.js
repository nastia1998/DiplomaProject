import express from "express";
import auth from "../middleware/auth";
import skillController from "../controllers/skillController";
import accessControl from "../middleware/accessControl";

const {
  addSkill,
  getSkills,
  updateSkillInfo,
  removeSkill,
  getAvailableSkillsForUser,
} = skillController;

const router = express.Router();

router.post(
  "/:role",
  auth,
  accessControl.grantAccess("createOwn", "skill"),
  addSkill
);

router.get(
  "/:role",
  auth,
  accessControl.grantAccess("readAny", "skill"),
  getSkills
);

router.get(
  "/:user_id/:role",
  // auth,
  // accessControl.grantAccess("readAny", "skill"),
  getAvailableSkillsForUser
);

router.put(
  "/:skill_id/:role",
  auth,
  accessControl.grantAccess("updateAny", "skill"),
  updateSkillInfo
);

router.delete(
  "/:skill_id/:role",
  auth,
  accessControl.grantAccess("deleteAny", "skill"),
  removeSkill
);

export default router;
