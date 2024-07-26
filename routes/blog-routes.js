import express from "express";
import { addBlog, deleteBlogById, getAllBLogs, getBlogById, updateBlog } from "../controllers/blog-controller.js";


const blogrouter = express.Router();

blogrouter.get("/", getAllBLogs);
blogrouter.post("/add", addBlog);
blogrouter.put("/update/:id", updateBlog);
blogrouter.get("/:id", getBlogById);
blogrouter.delete("/:id", deleteBlogById);
blogrouter.get('/user/:id', getBlogById);

export default blogrouter;



