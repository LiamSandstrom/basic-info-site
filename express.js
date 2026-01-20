import express from 'express';
import fs from "fs/promises"

const app = express();
const PORT = 3000;

//cba changing old but yes this should use public folder instead not root 
app.use(express.static("."));

app.use(async (req, res) => {
    let path = req.path === "/" || req.path === "/home" ? "/index" : req.path;
    try {
        const content = await fs.readFile(`./views${path}.html`, 'utf8');
        res.type("text/html").send(content);
    }
    catch {
        res.status(404)
        try {
            const content = await fs.readFile(`./views/404.html`, 'utf8');
            res.send(content);
        }
        catch {
            res.send("404 - Not Found");
        }
    }
})

app.listen(PORT, (error) => {
    if (error) throw error;

    console.log(`Server running at http://localhost:${PORT}/`);
})
