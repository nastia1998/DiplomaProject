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
  getUnconfirmedRequests,
  getUserSkillWithByIdWithInfo,
  getConfirmedRequests,
} = userskillController;

const router = express.Router();

router.get("/:userskill_id", getUserSkillWithByIdWithInfo);
router.get("/users/:user_id", getUserSkillsByUserId);
router.get(
  "/potentialmentors/:role",
  // auth,
  // accessControl.grantAccess("readAny", "student"),
  getPotentialMentors
);
router.get("/:user_id/requests", getAllRequests);
router.get("/:user_id/requests/unconfirmed", getUnconfirmedRequests);
router.get("/:user_id/requests/confirmed", getConfirmedRequests);
router.post("/requests", sendRequestToMentor);
router.post("/:userskill_id", approveUserSkill);
router.post("/", addUserSkill);
router.put("/:userskill_id", approveRequest);

export default router;
