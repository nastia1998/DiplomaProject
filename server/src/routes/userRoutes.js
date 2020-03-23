import express from "express";
import auth from "../middleware/auth";
import userController from "../controllers/userController";

const {
  addUser,
  findByCredentials,
  fetchUserProfile,
  updateUserInfo
} = userController;

const router = express.Router();

router.post("/", addUser);
router.post("/login", findByCredentials);
router.get("/me", auth, fetchUserProfile);
router.put("/:user_id", auth, updateUserInfo);

export default router;
