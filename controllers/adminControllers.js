// controllers/authController.js
const jwt = require('jsonwebtoken');

const Role = require('../models/roles');
const User = require('../models/users');

const secretKey = 'jwt'; // Replace with your actual secret key
 const adminLogin  = (req, res) => {
  const { username, password } = req.body;

  // Hardcoded admin credentials
  if (username === 'admin' && password === 'admin') {
    // Generate JWT token
    const token = jwt.sign({ username, role: 'admin' }, secretKey, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};



 const createRoleAdmin = async (req, res) => {
    const { roleName , description } = req.body;
  
    try {
      
      const existingRole = await Role.findOne({ name: roleName });
      if (existingRole) {
        return res.status(400).json({ message: 'Role already exists' });
      }
      const newRole = new Role({ name: roleName , description });
      await newRole.save();
      res.json({ message: 'Role created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error creating role', error: error.message });
    }
  };


  const listRolesbyAdmin = async (req, res) => {
    try {
      const roles = await Role.find();
      res.json({ roles });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching roles', error: error.message });
    }
  };






 const createUser = async (req, res) => {

  console.log(req.body);
  const { name, password, email, role } = req.body;
  const roleData=role



  try {
   
    const role = await Role.findOne({ name: roleData });
    const  existedUser= await User.findOne({email: email,})


    console.log(role);
    if (!role) {
      return res.status(400).json({ message: 'Role not found' });
    }
    if(existedUser){
      return res.status(400).json({ message: 'This mail Already Existed' });
    }



   
    const newUser = new User({ name, password, role: role._id ,email });
    console.log(newUser);
    newUser.save();

   

    res.json({ message: 'User added successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Error adding user', error: error.message });
  }
};

 const listUsers = async (req, res) => {
  try {
   
    const users = await User.find().populate('role');
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

 const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, password, email, role } = req.body;
  const roleData=role
  try {
  
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

   
    const role = await Role.findOne({ name: roleData });
    if (!role) {
      return res.status(400).json({ message: 'Role not found' });
    }

 
    user.name = name;
    user.password = password;
    user.email = password;
    user.role = role._id;

    await user.save();

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

 const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
   
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

   
    

 
    await user.remove();

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};


module.exports ={
    adminLogin,
    createRoleAdmin,
    listRolesbyAdmin,
    createUser,
    listUsers,
    updateUser,
    deleteUser,
}




