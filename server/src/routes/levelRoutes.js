import express from "express";
import auth from "../middleware/auth";
import levelController from "../controllers/levelController";
import accessControl from "../middleware/accessControl";

const { addLevel, getLevels, updateLevelInfo, removeLevel } = levelController;

const router = express.Router();

router.post(
  "/:role",
  auth,
  accessControl.grantAccess("createOwn", "level"),
  addLevel
);

router.get(
  "/:role",
  auth,
  accessControl.grantAccess("readAny", "level"),
  getLevels
);

router.put(
  "/:level_id/:role",
  auth,
  accessControl.grantAccess("updateAny", "level"),
  updateLevelInfo
);

router.delete(
  "/:level_id/:role",
  auth,
  accessControl.grantAccess("deleteAny", "level"),
  removeLevel
);

export default router;
