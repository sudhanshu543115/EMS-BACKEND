const mongoose = require("mongoose")

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    industry: {
      type: String,
      required: true
    },

    description: {
      type: String,
      maxlength: 500
    },

    location: {
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      }
    },

    website: {
      type: String,
      trim: true
    },

    metrics: {
      staffCount: {
        type: Number,
        default: 0,
        min: 0
      },
      revenue: {
        type: Number,
        default: 0,
        min: 0
      },
      projectsCount: {
        type: Number,
        default: 0,
        min: 0
      }
    },

    isDeleted: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date,
      default: null
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model("Company", companySchema)
