import { Router } from "express"

const bookRouter = new Router();

bookRouter.get("/", (req, res) => res.send("All Books"))

export default bookRouter;
