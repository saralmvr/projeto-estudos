const express = require("express");
const router = express.Router();

const timersController = require("../controllers/timerscontroller");

router.get("/timers", timersController.index);
router.get("/timers/:id", timersController.show);
router.post("/timers", timersController.create);
router.put("/timers/:id", timersController.update);
router.delete("/timers/:id", timersController.remove);

module.exports = router;
