const Company = require("./company.model")
const mongoose = require("mongoose")


exports.createCompany = async (req, res) => {
  try {
    const {
      name,
      logo,
      industry,
      description,
      location,
      website,
      status,
      metrics
    } = req.body

    if (!name || !industry) {
      return res.status(400).json({
        success: false,
        message: "Company name and industry are required"
      })
    }
   if (!location?.city || !location?.state || !location?.country) {
      return res.status(400).json({
        success: false,
        message: "Location (city, state, country) is required"
      })
    }
    const company = await Company.create({
      name,
      logo,
      industry,
      description,
      location,
      website,
      status,
      metrics,
      createdBy: req.user?._id // if auth middleware exists
    })

    res.status(201).json({
      success: true,
      message: "Company created successfully",
      data: company
    })
  } catch (error) {
    console.error("Create Company Error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to create company"
    })
  }
}

exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ isDeleted: false }).sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      count: companies.length,
      data: companies
    })
  } catch (error) {
    console.error("Get Companies Error:", error)

    return res.status(500).json({
      success: false,
      message: "Failed to fetch companies"
    })
  }
}

exports.getCompanyById = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid company ID"
      })
    }

    const company = await Company.findOne({ _id: id, isDeleted: false })

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found"
      })
    }

    return res.status(200).json({
      success: true,
      data: company
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch company"
    })
  }
}

exports.updateCompany = async (req, res) => {
  try {
    const { id } = req.params

    // 1️⃣ Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid company ID"
      })
    }

    // 2️⃣ Allow only specific fields to be updated
    const allowedUpdates = [
      "name",
      "industry",
      "description",
      "location",
      "website",
      "metrics",
      "status"
    ]

    const updates = {}
    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field]
      }
    })

    // 3️⃣ Check if update body is empty
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update"
      })
    }

    // 4️⃣ Update company
    const company = await Company.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    })

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found"
      })
    }

    return res.status(200).json({
      success: true,
      data: company
    })
  } catch (error) {
    console.error("Update Company Error:", error)

    // 5️⃣ Handle validation errors properly
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message
      })
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update company"
    })
  }
}

exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid company ID"
      })
    }

    // Optional: admin-only delete
    if (req.user?.role !== "super_admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete company"
      })
    }

    const company = await Company.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    )

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Company deleted successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete company"
    })
  }
}





