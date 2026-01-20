import fs from "fs/promises"
import express from "express"
import authorRouter from "./routes/authourRouter.js";
import bookRouter from "./routes/bookRouter.js";
import indexRouter from "./routes/indexRouter.js";

const app = express();

app.use("/authors", authorRouter)
app.use("/books", bookRouter)
app.use("/", indexRouter)

app.use((req, res) => {
    res.status(404).sendFile("404.html", { root: "./views" });
})

const PORT = 3000;

app.listen(PORT, (error) => {
    if (error) throw error;

    console.log(`server running at http://localhost:${PORT}/`)
})
