import { AppDataSource } from "./data-source";
import * as express from "express";
const bodyparser = require("body-parser");
const cors = require("cors");

import { userRouter }from "./routes/user.routes";
import { bookRouter } from "./routes/book.routes";
import { readBookRouter } from "./routes/readBook.routes";

  const app = express();
  const port = 4900;
  
  app.use(bodyparser.json());
  app.use(cors());
  

  AppDataSource.initialize().then(() => {
    app.get("/", (req, res) => {
      res.status(200).json({ Success: `Server is listening on port ${port}` });
    });
  
    app.use(userRouter);
    app.use(bookRouter)
    app.use(readBookRouter)
    
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
    
  }).catch((err) => {
    console.log('err in appdatasource: ', err);

  })
  