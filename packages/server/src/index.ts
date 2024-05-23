// src/index.ts
import express, { Request, Response } from "express";
import path from "path";
import routine from "./routes/routine";
import auth, {authenticateUser} from "./routes/auth";
import { connect } from "./services/mongo";
import fs from "node:fs/promises";


const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

connect("csc437");
app.use(express.static(staticDir));
app.use(express.json());
app.use("/api/routines/", routine);
app.use("/auth", auth);


const nodeModules = path.resolve(
  __dirname,
  "../../../node_modules"
);
console.log("Serving NPM packages from", nodeModules);
app.use("/node_modules", express.static(nodeModules));



app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
    }
);

app.listen(port, () => {
  console.log(`haha Server running at http://localhost:${port} haha`);
});

app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});