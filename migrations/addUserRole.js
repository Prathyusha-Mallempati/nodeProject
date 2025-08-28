// Run once when it is required
const User = require('../models/userModel');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const runMigration = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);

    // Update all users that don't have "role"
    const result = await User.updateMany(
      { role: { $exists: false } },  // condition
      { $set: { role: 'user' } }     // default role
    );

    console.log(`✅ Migration completed. Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`);

    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Migration failed:', err);
    mongoose.disconnect();
  }
};

runMigration();