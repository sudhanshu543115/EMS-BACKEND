const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  HR: 'hr',
  TEAM_LEAD: 'tl',
  EMPLOYEE: 'employee'
};

const ROLE_RANKS = {
  [ROLES.SUPER_ADMIN]: 100,
  [ROLES.ADMIN]: 80,
  [ROLES.HR]: 60,
  [ROLES.TEAM_LEAD]: 40,
  [ROLES.EMPLOYEE]: 20
};

module.exports = {
  ROLES,
  ROLE_RANKS
};
