const express = require("express")
const router = express.Router()


const {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany
} = require("./comapany.controller")

// Middlewares (optional)
const auth = require("../../middlewares/auth.middleware")
const role = require("../../middlewares/role.middleware")

router.post("/", auth, role("super_admin"), createCompany)
router.get("/", getCompanies)
router.get("/:id", getCompanyById)
router.patch("/:id", auth, role("super_admin"), updateCompany)
router.delete("/:id", auth, role("super_admin"), deleteCompany)

module.exports = router

