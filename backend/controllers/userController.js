const { User } = require("../database/db");
const {validationResult} = require("express-validator");
const bcrypt = require('bcrypt');

const getOneUser = async(req, res)=>{
    const {id} = req.params;

    try {
        if(!id){
            return res.status(400).json({success: false, message: "Id must not me empty", data:null});
        }
        const user = await User.findOne({
            where: { userId: id },
            attributes: { exclude: ['password'] } // Exclude the password field
        });

        if(user){
            return res.status(200).json({success: true, message: "User found", data:user});
        }else{
            return res.status(404).json({success: false, message: "User does not exist", data:null});
        }

        

    } catch (error) {
        return res.status(500).json({success: false, message: "Internal error. Try again", data:null});
    }
};

const getAllUsers = async(req, res)=>{

    try {
        
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });

        if(users){
            res.status(200).json({success: true, message: "Users found", data:users});
        }else{
            res.status(404).json({success: false, message: "Users do not exist", data:null});
        }

    } catch (error) {
        res.status(500).json({success: false, message: "Internal error. Try Again", data:null});
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;

    try {

        if(!id){
            return res.status(400).json({success: false, message: "Id must not me empty", data:null});
        }

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return  res.status(400).json({errors: errors.array()});
        }

        // Find the user by ID and update their information
        const updatedRows = await User.update(req.body, {
            where: { userId: id }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ success: false, message: "User not found", data: null });
        }

        // Fetch the updated user
        const updatedUser = await User.findOne({ where: { userId: id } });

        res.status(200).json({ success: true, message: "Successfully updated", data: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ success: false, message: "Failed to update", data: null });
    }
}

const deleteUser = async(req, res)=>{
    const {id} = req.params;
    const {password} = req.body;

    try {
        
        if(!id){
            return res.status(400).json({success: false, message: "Id must not be empty", data:null});
        }

        if(!password){
            return res.status(400).json({success: false, message: "Password must not be empty", data:null});
        }

        const user = await User.findOne({where: {userId: id}});
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User does not exist",
                data: null
            });
        }

        //if user exist compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Incorrect password",
                data: null
            });
        }

        const deletedUser = await User.destroy({where: {userId: id}});
       
        if(deletedUser === 0){
            res.status(404).json({success: false, message: "User do not exist", data:deletedUser});
        }

        res.status(200).json({success: true, message: "Successfully deleted", data:deletedUser});

    } catch (error) {
        res.status(500).json({success: false, message: "Failed to delete", data:null});
    }
};





module.exports = {
    getOneUser,
    getAllUsers,
    deleteUser,
    updateUser
};