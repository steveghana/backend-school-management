const {
  RegisterNewSchool,
  getDetails,
  createSection,
  updateSection,
  getSections,
  createClass,
  getClasses,
} = require("./school.controller");
const { checkToken } = require("../../auth/token_validation");
const router = require("express").Router();

router.post("/", RegisterNewSchool);
router.get("/", getDetails);

router.post("/class/section", checkToken, createSection);
router.patch("/class/section", checkToken, updateSection);
router.get("/class/section", checkToken, getSections);

router.post("/class", checkToken, createClass);
router.get("/class", checkToken, getClasses);

module.exports = router;
