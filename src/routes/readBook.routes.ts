import * as express from "express";
import { addUserBook , deleteUserBook , getAllUsersBook , updateUserBook} from "../controllers/readbook.controller";

const router = express.Router();

router.post("/addReadBook", addUserBook);
router.get("/getAllReadBooks/:userId", getAllUsersBook);
router.put("/updateReadBook/:id",  updateUserBook);
router.delete("/deleteReadBook/:id", deleteUserBook);

export {router as readBookRouter};