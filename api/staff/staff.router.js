const { createStaff, getStaffs, getStaffByEmployeeId, login } = require("./staff.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation")

router.post("/", checkToken, createStaff);
router.get("/",  checkToken, getStaffs);
router.get("/:id",  checkToken, getStaffByEmployeeId)
router.post("/login", login)

module.exports = router;