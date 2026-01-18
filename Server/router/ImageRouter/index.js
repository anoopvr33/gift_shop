import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.json({ url: `http://localhost:3003/${req.file.filename}` });
  //   const fileUrls = req.files.map((file) => ({
  //     url: `http://localhost:3003/${req.file.filename}`,
  //     filename: file.filename,
  //   }));

  //   res.json({ files: fileUrls });
});

export default router;
