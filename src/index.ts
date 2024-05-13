import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { uploadSingleFile } from "./middlewares/upload";
import router from "./routers";

dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.post("/upload", uploadSingleFile, (req, res) => {
  console.log(req.file);
  res.send("File berhasil diunggah");
});

app.get("/", async (req, res) => {
  try {
    const listUser = await prisma.user.findMany();
    const singleUser = await prisma.user.findFirst({
      where: {
        id: 1,
      },
    });

    res.send({
      listUser,
      singleUser,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Terjadi kesalahan saat memproses permintaan");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
