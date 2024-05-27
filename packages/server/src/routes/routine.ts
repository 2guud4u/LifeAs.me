import express, { Request, Response } from "express";
import routines from "../services/routine-svc";
import { Routine } from "../models/routine";
import {authenticateUser} from "./auth";
const router = express.Router();

router.get("/:routineId", (req: Request, res: Response) => {
  const { routineId } = req.params;

  routines
    .get(routineId)
    .then((routine: Routine) => res.json(routine))
    .catch((err) => res.status(404).end());
});

router.post("/", authenticateUser,(req: Request, res: Response) => {
  try{
    const newRoutine = req.body;
    newRoutine.id = newRoutine.name + newRoutine.createdBy;

  routines
    .create(newRoutine)
    .then((routine: Routine) => res.status(201).send(routine))
    .catch((err) => res.status(500).send(err));
  }
  catch(err){
    res.status(500).send
  }
  
});

router.put("/:routineId", authenticateUser, (req: Request, res: Response) => {
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