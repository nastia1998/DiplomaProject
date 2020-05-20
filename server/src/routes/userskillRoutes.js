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
  cancelRequest,
  getStudetsForMentor,
  addApprovedUserSkill,
  getRejectedRequests,
  approveNotitication,
  rejectSkill,
} = userskillController;

const router = express.Router();

router.get("/:userskill_id", getUserSkillWithByIdWithInfo);
router.get("/users/:user_id", getUserSkillsByUserId);
router.get(
  "/potentialmentors/:role",
  auth,
  accessControl.grantAccess("readAny", "student"),
  getPotentialMentors
);
router.get("/:user_id/requests", getAllRequests);
router.get("/:user_id/requests/unconfirmed", getUnconfirmedRequests);
router.get("/:user_id/requests/confirmed", getConfirmedRequests);
router.get("/:user_id/requests/rejected", getRejectedRequests);
router.get("/:user_id/students", getStudetsForMentor);
router.post("/requests", sendRequestToMentor);
router.post("/", addUserSkill);
router.post("/approved", addApprovedUserSkill);
router.put("/:userskill_id/approve", approveRequest);
router.put("/:userskill_id/skill", approveUserSkill);
router.put("/:userskill_id/cancel", cancelRequest);
router.delete("/:userskill_id/notifications", approveNotitication);

export default router;
