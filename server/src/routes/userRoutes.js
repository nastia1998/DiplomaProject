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
  updateUserInfo
} = userController;

const router = express.Router();

router.post("/", addUser);
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
router.post("/login", findByCredentials);
router.get("/me", auth, fetchUserProfile);
router.put("/:user_id", auth, updateUserInfo);

export default router;
