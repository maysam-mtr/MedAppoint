const { Specialist } = require("../database/db");
const { Op } = require("sequelize");
const {validationResult} = require("express-validator");

const updateSpecialist = async (req, res) => {
    const { specialistId } = req.params;

    try {

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return  res.status(400).json({errors: errors.array()});
        }

        const updated = await Specialist.update(req.body, {
            where: { specialistId: specialistId },
            returning: true
        });

        if (updated) {
            const updatedSpecialist = await Specialist.findOne({
                where: {specialistId: specialistId},
                attributes: { exclude: ['password'] }
            });
            return res.status(200).json({ success: true, message: "Specialist Successfully updated", data: updatedSpecialist });
        }

        return res.status(404).json({ success: false, message: "Specialist not found", data: null });
    } catch (error) {
        console.error('Error updating specialist:', error);
        return res.status(500).json({ success: false, message: "Failed to update", data: null });
    }
};

const deleteSpecialist = async (req, res) => {
    const { specialistId } = req.params;

    try {

        if(!specialistId){
            return res.status(400).json({success: false, message: "Id must not me empty", data:null});
        }
        
        const deletedCount = await Specialist.destroy({ where: { specialistId: specialistId } });

        if (deletedCount) {
            return res.status(200).json({ success: true, message: " Specialist Successfully deleted", data: null });
        }

        return res.status(404).json({ success: false, message: "Specialist not found", data: null });
    } catch (error) {
        console.error('Error deleting doctor:', error);
        return res.status(500).json({ success: false, message: "Failed to delete", data: null });
    }
};

const getOneSpecialist = async (req, res) => {
    const { specialistId } = req.params;

    try {
        if(!specialistId){
            return res.status(400).json({success: false, message: "Id must not me empty", data:null});
        }
        
        const specialist = await Specialist.findOne({
            where: {specialistId: specialistId},
            attributes: { exclude: ['password'] }
        });

        if (specialist.length === 0) {
            return res.status(404).json({ success: false, message: "Specialist does not exist", data: null });
        }

        return res.status(200).json({ success: true, message: "Specialist found", data: specialist });
    } catch (error) {
        console.error('Error fetching specialist:', error);
        return res.status(500).json({ success: false, message: "Failed to fetch specialist", data: null });
    }
};

const getAllSpecialists = async (req, res) => {
    try {
        const specialists = await Specialist.findAll({ 
            where: { isApproved: 'approved' },
            attributes: { exclude: ['password'] } 
        });

        if(specialists.length === 0){
            return res.status(404).json({ success: false, message: "No results", data: null });
        }

        return res.status(200).json({ success: true, message: "Specialists found", data: specialists });
    } catch (error) {
        console.error('Error fetching specialists:', error);
        return res.status(500).json({ success: false, message: "Failed to fetch specialists", data: null });
    }
};

const searchForSpecialist = async (req, res) => {
    const { query } = req.query; // Get the search query from request parameters

    try {
        const conditions = {
            isApproved: 'approved',
            [Op.or]: []
        };

        // Check if a query is provided
        if (query) {
            conditions[Op.or].push(
                { fname: { [Op.like]: `%${query}%` } },
                { lname: { [Op.like]: `%${query}%` } },
                { specialization: { [Op.like]: `%${query}%` } }
            );
        }
        // Fetch doctors based on constructed conditions
        const specialists = await Specialist.findAll({
            where: conditions,
            attributes: { exclude: ['password'] }
        });

        if(specialists.length === 0){
            return res.status(404).json({ success: false, message: "No results", data: null });
        }

        return res.status(200).json({ success: true, message: "Specialists found", data: specialists });
    } catch (error) {
        console.error('Error fetching doctors:', error);
        return res.status(500).json({ success: false, message: "Failed to fetch specialists", data: null });
    }
};

module.exports = {
    updateSpecialist,
    deleteSpecialist,
    getOneSpecialist,
    searchForSpecialist,
    getAllSpecialists
}