import { Router } from "express";
// 1) Import ตัว Database ที่สร้างไว้มาใช้งาน
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const collection = db.collection("products");

  const products = await collection.find({}).limit(10).toArray();

  return res.json({ data: products });
});

productRouter.get("/:id", async (req, res) => {
  const collection = db.collection("products");
  const productId = new ObjectId(req.params.productId);
  const products = await collection.find({ _id: productId }).toArray();

  return res.json({ data: products });
});

productRouter.post("/", async (req, res) => {
  // 2) เลือก Collection ที่ชื่อ `products`
  const collection = db.collection("products");
  // 3) เริ่ม Insert ข้อมูลลงใน Database โดยใช้ `collection.insertOne(query)`
  // นำข้อมูลที่ส่งมาใน Request Body ทั้งหมด Assign ใส่ลงไปใน Variable ที่ชื่อว่า `movieData`
  const productData = { ...req.body };
  const products = await collection.insertOne(productData);

  // 4) Return ตัว Response กลับไปหา Client
  return res.json({ message: "Product has been created successfully" });
});

productRouter.put("/:id", async (req, res) => {
  const collection = db.collection("products");
  const productId = new ObjectId(req.params.productId);
  const newProductData = { ...req.body };
  await collection.updateOne({ _id: productId }, { $set: newProductData });

  return res.json({ message: "Product has been updated successfully" });
});

productRouter.delete("/:id", async (req, res) => {
  const collection = db.collection("products");
  const productId = new ObjectId(req.params.productId);
  await collection.deleteOne({ _id: productId });

  return res.json({ message: "Product has been deleted successfully" });
});

export default productRouter;
