import express from "express";
import {
  createBook,
  DeleteBook,
  getBooks,
  updateBook,
} from "../Controller/bookController.js";
const router = express.Router();
router.get("/", getBooks);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", DeleteBook);
export default router