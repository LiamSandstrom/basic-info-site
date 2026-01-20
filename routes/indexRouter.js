import { Router } from "express"

const indexRouter = new Router();

indexRouter.get("/", (req, res) => res.send("Home"));

export default indexRouter;
