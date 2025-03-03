import express from "express";
import { addJuteBag, addTable, fetchJuteBags, fetchTables } from "../controllers/product3d.js";
import authUser from "../middleware/auth.js";

const product3dModelRouter = express.Router();

product3dModelRouter.post("/add-jute-bag", addJuteBag);
product3dModelRouter.post("/fetch-jute-bags", fetchJuteBags);
product3dModelRouter.post("/add-table", addTable);
product3dModelRouter.post("/fetch-table", fetchTables);

export default product3dModelRouter;
