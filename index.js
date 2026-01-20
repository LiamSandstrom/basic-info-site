import { createServer } from "http";
import fs from "fs/promises"


const hostname = "localhost"
const port = 8080

const server = createServer(async (req, res) => {
    let path = req.url;

    let isCss = isCssRequest(path);
    res.setHeader("Content-Type", isCss ? "text/css" : "text/html");

    try {
        if (path === "/" || path === "/home") path = "index"
        const contentPath = isCss ? `.${path}` : `./views/${path}.html`;
        const content = await fs.readFile(contentPath, "utf8");
        res.statusCode = 200;
        res.end(content)
    }
    catch {
        res.statusCode = 404;
        try {
            const content = await fs.readFile("./views/404.html", "utf8");
            res.end(content);
        }
        catch {
            res.end("404 - Not Found")
        }
    }
})

server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`)
})

function isCssRequest(path) {
    return path.endsWith(".css");
}


