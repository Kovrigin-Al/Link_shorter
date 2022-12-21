const { Router } = require("express");
const Link = require("../models/Link");
const authMiddleware = require("../middleware/authMiddleware");
const linkRouter = Router();
const config = require("config");
const shortId = require("shortid");

linkRouter.post("/createLink", authMiddleware, async (req, res, next) => {
  try {
    const baseUrl = config.get("baseUrl");
    const { from } = req.body;
    const code = shortId.generate();

    const existedLink = await Link.findOne({ from });

    if (existedLink) {
      return res.status(200).json({ link: existedLink });
    }

    const to = baseUrl + "/to/" + code;

    const link = new Link({
      from,
      to,
      code,
      owner: req.decodedUserId,
    });

    await link.save();

    res.status(201).json({ link });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
linkRouter.get("/", authMiddleware, async (req, res, next) => {
  const links = await Link.find({ owner: req.decodedUserId });
  res.status(200).json(links);
  try {
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
linkRouter.get("/:id", authMiddleware, async (req, res, next) => {
  try {
    const link = await Link.findById(req.params.id);
    res.status(200).json(link);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = { linkRouter };
