import express from "express";
import auth from "../middleware/auth";
import accessControl from "../middleware/accessControl";
import userskillController from "../controllers/userskillController";

const {
  addUserSkill,
  getUserSkillsByUserId,
  approveUserSkill,
  getPotentialMentors,
  sendRequestToMentor,
  getAllRequests,
  approveRequest,
} = userskillController;

const router = express.Router();

router.get("/users/:user_id", getUserSkillsByUserId);
router.get(
  "/potentialmentors/:role",
  // auth,
  // accessControl.grantAccess("readAny", "student"),
  getPotentialMentors
);
router.get("/:mentor_id/requests", getAllRequests);
// router.post("/requests", sendRequestToMentor);
router.post("/:userskill_id", approveUserSkill);
// router.post("/", addUserSkill);
router.put("/:userskill_id", approveRequest);

export default router;
