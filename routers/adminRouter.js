// router.js
const express =require( 'express');
const  { adminLogin, createRoleAdmin, createUser, deleteUser, listRolesbyAdmin, listUsers, updateUser } = require( '../controllers/adminControllers');
const { verifyAdmin } = require('../middlewares/verifyJwt');


const router = express.Router();


router.post('/login', adminLogin);


router.post('/roles', createRoleAdmin);
router.get('/roles', listRolesbyAdmin);


router.post('/users',createUser);
router.get('/users', listUsers);
router.put('/users/:id',updateUser);
router.delete('/users/:id',deleteUser);

module.exports ={
    router
    } 
