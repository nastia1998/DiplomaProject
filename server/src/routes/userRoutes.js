import express from "express";
import auth from "../middleware/auth";
import userController from "../controllers/userController";
import accessControl from "../middleware/accessControl";

const {
  addUser,
  addManager,
  getManagers,
  removeManager,
  findByCredentials,
  fetchUserProfile,
  updateUserInfo,
  getStudents,
  addUserSkill,
  approveUserSkill,
  getPotentialMentors,
  getUserSkillsByUserId,
  sendRequestToMentor,
} = userController;

const router = express.Router();

router.post("/", addUser);
router.post("/requests", sendRequestToMentor);
router.post("/userskills/:userskillid", approveUserSkill);
router.post("/userskills", addUserSkill);
router.get("/:user_id/userskills", getUserSkillsByUserId);
router.post(
  "/:role/manager",
  auth,
  accessControl.grantAccess("createAny", "manager"),
  addManager
);
router.get(
  "/:role/managers",
  auth,
  accessControl.grantAccess("readAny", "manager"),
  getManagers
);
router.delete(
  "/:role/managers/:manager_id",
  auth,
  accessControl.grantAccess("deleteAny", "manager"),
  removeManager
);
router.get(
  "/students/:role",
  auth,
  accessControl.grantAccess("readAny", "student"),
  getStudents
);
router.get(
  "/potentialmentors/:role",
  auth,
  accessControl.grantAccess("readAny", "student"),
  getPotentialMentors
);
router.post("/login", findByCredentials);
router.get("/me", auth, fetchUserProfile);
router.put("/:user_id", auth, updateUserInfo);

export default router;
