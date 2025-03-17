const express = require("express");
const router = express.Router();

router.get("/send-test", async (req, res) => {
  res.json({ message: "Hello this is send test mail" });
})

module.exports = router;
