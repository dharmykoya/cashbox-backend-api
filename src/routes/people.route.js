import express from "express";
import PeopleController from "../controllers/people.controller";

const {
  Allpeople,
  CreatePeople,
  CreateAttribute,
  EditPeople,
  EditAttribute,
  searchByName
} = PeopleController;

const router = express.Router();

router.get("/", Allpeople);
router.post("/", CreatePeople);
router.post("/:peopleId/attribute", CreateAttribute);
router.patch("/:peopleId", EditPeople);
router.patch("/:peopleId/attribute", EditAttribute);
router.get("/search", searchByName);

export default router;
