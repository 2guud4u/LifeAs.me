// src/index.ts
import express, { Request, Response } from "express";
import routine from "./routes/routine";
import auth, {authenticateUser} from "./routes/auth";
import { connect } from "./services/mongo";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

connect("csc437");
app.use(express.static(staticDir));

app.use(express.json());
app.use("/auth", auth);
app.use("/api/routines/", authenticateUser, routine);
app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
    }
);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});