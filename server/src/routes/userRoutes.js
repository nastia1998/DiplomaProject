import express from "express";
import auth from "../middleware/auth";
import userController from "../controllers/userController";
import accessControl from "../middleware/accessControl";

const {
  addUser,
  findByCredentials,
  fetchUserProfile,
  updateUserInfo,
  addManager,
  getManagers,
  removeManager,
  getStudents,
  getUsers,
} = userController;

const router = express.Router();

router.get("/", getUsers);
router.get(
  "/:role/managers",
  auth,
  accessControl.grantAccess("readAny", "manager"),
  getManagers
);
router.get(
  "/students/:role",
  auth,
  accessControl.grantAccess("readAny", "student"),
  getStudents
);
router.get("/me", auth, fetchUserProfile);

router.post(
  "/:role/manager",
  auth,
  accessControl.grantAccess("createAny", "manager"),
  addManager
);
router.post("/login", findByCredentials);
router.post("/", addUser);

router.put("/:user_id", auth, updateUserInfo);

router.delete(
  "/:role/managers/:manager_id",
  auth,
  accessControl.grantAccess("deleteAny", "manager"),
  removeManager
);

export default router;
