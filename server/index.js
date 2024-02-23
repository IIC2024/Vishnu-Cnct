const express = require('express');
const bcrypt=require("bcrypt");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Student=require('./models/Student');
const Faculty=require('./models/Faculty');
const cors=require('cors');

const mahesh=require('mongoose');
const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://dinnu:dinnu@cluster0.ciq0jbr.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db=mongoose.connection;
db.once('open', () => {
    console.log('Connected to MongoDB');})
// Define a user schema
// Create a User model based on the schema
  // Import your Faculty model

app.post('/signup', async (req, res) => {
  try {
    const userData = req.body;

    const requiredFields = ["username", "userid", "password", "isfaculty"];
    
    // Check if all required fields are present
    for (const field of requiredFields) {
        if (!(field in userData)) {
            return res.status(400).json({
                message: `Missing required field: ${field}`
            });
        }
    }

    // Check if the user already exists
    let existingUser;
    if (userData.isfaculty) {
        existingUser = await Faculty.findOne({ facultyId: userData.userid });
    } else {
        existingUser = await Student.findOne({ studentId: userData.userid });
    }
    if (existingUser) {
        return res.status(400).json({
            message: "User already exists"
        });
    }

    // Create a new user object based on user type
    let newUser;
    if (userData.isfaculty) {
        newUser = new Faculty({
            facultyId: userData.userid,
            password: userData.password,
            username: userData.username,
            isfaculty: userData.isfaculty
        });
    } else {
        newUser = new Student({
            studentId: userData.userid,
            password: userData.password,
            username: userData.username,
            isfaculty: userData.isfaculty
        });
    }

    // Save the new user
    await newUser.save();
    
    res.status(201).json({ message: "User registered successfully" });
} catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
}

});
app.post('/login', async (req, res) => {
    try {
        const userData = req.body;
        console.log(userData);

        let user;
        if(userData.isfaculty)
       user = await Faculty.findOne({ facultyId: userData.userid });
        else
      user = await Student.findOne({ studentId: userData.userid });
        console.log(user);
    
        if (!user) {
          return res.status(401).json({ message: "User not found" });
        }
        const passwordMatch = await bcrypt.compare(userData.password, user.password);
        console.log(passwordMatch);
        if (!passwordMatch) {
          return res.status(402).json({ message: 'Invalid password' });
        }
        return res.status(201).json({
          message: "Login successful",
          userId: user.userid,
          username: user.username,
        });
        console.log("completed");
      } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
      }
});
app.get('/profile/:userId',async (req,res)=>{
try{
      const userid=req.params.userId;
      const isFaculty = req.query.isFaculty === 'true';
      console.log(userid,isFaculty);
      let user;
      if(isFaculty){
          user= await Faculty.findOne({facultyId:userid});
      }
      else{
        user= await Student.findOne({studentId:userid});
      }
      console.log(user);

       if (!user) {
          return res.status(401).json({ message: "User not found" });
        }
        if(isFaculty){
          return res.status(201).json({
            userid:user.facultyId,
            username: user.username,
            isfaculty: user.isfaculty,
            department: user.department,
            designation: user.designation,
            email: user.email,
            contactNumber: user.contactNumber,
            address: user.address,
            dateOfBirth: user.dateOfBirth,
            publications: user.publications,
            projects: user.projects,
            linkedinProfile: user.linkedinProfile,
            googleScholarProfile: user.googleScholarProfile,
            awards: user.awards,
  
          });
        }
        else{
        return res.status(201).json({
          userid: user.studentId,
          username: user.username,
          geeksForGeeksProfile: user.geeksForGeeksProfile,
          linkedinProfile: user.linkedinProfile,
          githubProfile: user.githubProfile,
          year: user.year,
          department: user.department,
          skills: user.skills || [],
          projects: user.projects || [],
          publications: user.publications || [],
          posts: user.posts || [],
          leetcodeProfile: user.leetcodeProfile,
          courseraProfile: user.courseraProfile,
          email: user.email,
          contactNumber: user.contactNumber,
          address: user.address,
          dateOfBirth: user.dateOfBirth,
          awards: user.awards || [],
          achievements: user.achievements,

        });}

}
catch(error){

}
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});