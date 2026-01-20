import { createServer } from "http";
import fs from "fs/promises"


const hostname = "localhost"
const port = 8080

const server = createServer(async (req, res) => {
    let path = req.url;
    res.setHeader("Content-Type", "text/html")
    let folder = "views";
    let end = "html";
    let isCss = false;

    if (isCssRequest(path)) {
        isCss = true
        res.setHeader("Content-Type", "text/css")
    }

    try {
        if (path === "/") path = "index"
        const contentPath = isCss ? `.${path}` : `./${folder}/${path}.${end}`;
        const content = await fs.readFile(contentPath, "utf8");
        res.statusCode = 200;
        res.end(content)
    }
    catch {
        res.statusCode = 404;
        const content = await fs.readFile("./views/404.html", "utf8");
        res.end(content);
    }

})

server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`)
})


function isCssRequest(path) {
    return path.substr(path.length - 3) == "css";
}


