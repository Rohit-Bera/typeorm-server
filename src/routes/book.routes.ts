import * as express from "express";
import { addBook , getAllBooks , searchBook , deleteBook , updateBook} from "../controllers/book.controller";

const router = express.Router();

router.post("/addBook", addBook);
router.get("/getAllBooks", getAllBooks);
router.put("/updateBook/:id",  updateBook);
router.delete("/deleteBook/:id", deleteBook);
router.get("/searchByName/:name" , searchBook);

export {router as bookRouter};