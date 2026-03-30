const { ROLE_RANKS, ROLES } = require("../config/roles");

module.exports = (requiredRole) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    const userRank = ROLE_RANKS[userRole] || 0;
    const requiredRank = ROLE_RANKS[requiredRole] || 0;

    // 1. Basic role check
    if (userRank < requiredRank) {
      return res.status(403).json({ message: "Insufficient permissions for this action" });
    }

    // 2. Add helper to check hierarchy against a target user
    req.canManage = (targetUserRank) => {
      // Super Admin can manage anyone
      if (userRole === ROLES.SUPER_ADMIN) return true;
      // Others can only manage lower ranks
      return userRank > targetUserRank;
    };

    next();
  };
};
