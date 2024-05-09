import { Schema, Model, Document, model } from "mongoose";
import { Routine } from "../models/routine";

const RoutineSchema = new Schema<Routine>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    summary: { type: String, required: true },
    createdBy: { type: String, required: true },
  },
  { collection: "routines" }
);
const RoutineModel: Model<Routine> = model("Routine", RoutineSchema);
// in-memory DB

function index(): Promise<Routine[]> {
  return RoutineModel.find();
}

function get(id: String): Promise<Routine> {
  return RoutineModel.find({ id })
    .then((list) => list[0])
    .catch((err) => {
      throw `${id} Not Found`;
    });
}

function create(routine: Routine): Promise<Routine> {
  return RoutineModel.findOne({ id: routine.id })
    .then((r) => {
      if (r) {
        throw `${routine.id} Already Exists`;
      } else {
          const p = new RoutineModel(routine);
          return p.save();
      }
    });

}

function update(id: String, routine: Routine): Promise<Routine> {
  return RoutineModel.findOne({ id })
  .then((r) => {
    if (r) {
      return RoutineModel
        .findOneAndUpdate({ id }, routine, { new: true })
        .then(() => routine)
        .catch((err) => {
          throw err;
        });
    } else {
      throw `${id} Not Found`;
    }
  });
}

export default { index, get, create, update};