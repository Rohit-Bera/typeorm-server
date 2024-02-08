import * as express from "express";
import { addUser , updateUser , searchUser , getAllUsers, deleteUser } from "../controllers/user.controller";

const router = express.Router();

router.post("/addUser", addUser);
router.get("/getAllUsers", getAllUsers);
router.put("/updateUser/:id",  updateUser);
router.delete("/deleteUser/:id", deleteUser);
router.get("/searchByName/:name" , searchUser);


export {router as userRouter};