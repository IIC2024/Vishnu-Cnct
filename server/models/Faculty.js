const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  proficiency: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
});

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  tech_stack: { type: [String] },
  source_link: { type: String }
});

const PublicationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: { type: [String], required: true },
  description: { type: String },
  source_link: { type: String }
});

const PostSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  caption: { type: String },
  timestamp: { type: Date, default: Date.now }
});

const AchievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date },
  description: { type: String },
  source_link: { type: String }
});

const FacultySchema = new mongoose.Schema({
  facultyId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  isfaculty: { type: Boolean, required: true },
  department: { type: String },
  designation: { type: String },
  email: { type: String },
  contactNumber: { type: String },
  address: { type: String },
  dateOfBirth: { type: Date },
  publications: { type: [PublicationSchema] },
  projects: { type: [ProjectSchema] },
  linkedinProfile: { type: String },
  googleScholarProfile: { type: String },
  awards: { type: [String] }
}, { collection: "Faculty" });

// Hash the password before saving to the database
FacultySchema.pre('save', async function (next) {
  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

const Faculty = mongoose.model('Faculty', FacultySchema);

module.exports = Faculty;
