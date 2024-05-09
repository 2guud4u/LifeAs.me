import express, { Request, Response } from "express";
import routines from "../services/routine-svc";
import { Routine } from "../models/routine";
const router = express.Router();

router.get("/:routineId", (req: Request, res: Response) => {
  const { routineId } = req.params;

  routines
    .get(routineId)
    .then((routine: Routine) => res.json(routine))
    .catch((err) => res.status(404).end());
});

router.post("/", (req: Request, res: Response) => {
  const newRoutine = req.body;
  console.log('got a post')
  routines
    .create(newRoutine)
    .then((routine: Routine) => res.status(201).send(routine))
    .catch((err) => res.status(500).send(err));
});

router.put("/:routineId", (req: Request, res: Response) => {
  const { routineId } = req.params;
  const updatedRoutine = req.body;

  routines
    .update(routineId, updatedRoutine)
    .then((routine: Routine) => res.json(routine))
    .catch((err) => res.status(404).end());
});

router.get("/", (req: Request, res: Response) => {
  routines
    .index()
    .then((list: Routine[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

export default router;