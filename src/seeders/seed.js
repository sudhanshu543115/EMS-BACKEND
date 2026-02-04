const mongoose = require('mongoose');
const User = require('../models/user.model');
const Role = require('../models/role.model');
require('dotenv').config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data (optional - remove if you want to keep existing data)
    await User.deleteMany({});
    await Role.deleteMany({});
    console.log('Cleared existing data');

    // Create roles
    const roles = [
      {
        name: 'super_admin',
        permissions: ['create_user', 'read_user', 'update_user', 'delete_user', 'manage_roles', 'manage_companies']
      },
      {
        name: 'admin',
        permissions: ['create_user', 'read_user', 'update_user', 'manage_companies']
      },
      {
        name: 'hr',
        permissions: ['read_user', 'update_user', 'manage_employees']
      },
      {
        name: 'tl',
        permissions: ['read_user', 'update_team_members']
      },
      {
        name: 'employee',
        permissions: ['read_profile', 'update_profile']
      }
    ];

    const createdRoles = await Role.insertMany(roles);
    console.log('Roles created:', createdRoles.length);

    // Create superadmin user
    const superadmin = {
      name: 'Super Admin',
      email: 'superadmin@ems.com',
      password: 'admin123', // You should hash this in production
      role: 'super_admin',
      isActive: true
    };

    const createdSuperadmin = await User.create(superadmin);
    console.log('Superadmin created:', createdSuperadmin.email);

    // Create sample users for testing
    const sampleUsers = [
      {
        name: 'John Admin',
        email: 'admin@ems.com',
        password: 'admin123',
        role: 'admin',
        isActive: true
      },
      {
        name: 'Jane HR',
        email: 'hr@ems.com',
        password: 'hr123',
        role: 'hr',
        isActive: true
      },
      {
        name: 'Mike Team Lead',
        email: 'tl@ems.com',
        password: 'tl123',
        role: 'tl',
        isActive: true
      },
      {
        name: 'Sarah Employee',
        email: 'employee@ems.com',
        password: 'emp123',
        role: 'employee',
        isActive: true
      }
    ];

    const createdUsers = await User.insertMany(sampleUsers);
    console.log('Sample users created:', createdUsers.length);

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('Super Admin: superadmin@ems.com / admin123');
    console.log('Admin: admin@ems.com / admin123');
    console.log('HR: hr@ems.com / hr123');
    console.log('Team Lead: tl@ems.com / tl123');
    console.log('Employee: employee@ems.com / emp123');

  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the seeder
seedData();
