const AuditLog = require("./auditLogs.model");

exports.logAction = async (data) => {
  try {
    await AuditLog.create(data);
  } catch (error) {
    console.error("Audit Log Error:", error);
  }
};

exports.getLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find().sort({ createdAt: -1 });
    res.json({ success: true, data: logs });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch logs" });
  }
};
