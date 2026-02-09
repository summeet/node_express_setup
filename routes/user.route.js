const express = require("express")
const router = express.Router();
const { userController } = require("../controller")
const authorize = require("../middleware/authorize")
const auth = require("../middleware/auth")

router.post("/", auth, authorize(["createUser"]), userController.createUser)
router.get("/", auth, authorize(["queryUsers"]), userController.queryUsers)
router.get("/:id", auth, authorize(["getUserById"]), userController.getUserById)
router.put("/:id", auth, authorize(["updateUser"]), userController.updateUser)
router.delete("/:id", auth, authorize(["deleteUser"]), userController.deleteUser)


module.exports = router