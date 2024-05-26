import express from "express";
const router = express.Router();

router.post("/register", (req, res) => {
  res.status(200).send("Calling register");
});

export default router;
