const { Reviews, User, Specialist } = require('../database/db');
const {validationResult} = require("express-validator");

// Create a new review
const createReview = async (req, res) => {
    const {userId, specialistId} = req.params;
    const { reviewText, reviewRating } = req.body;

    try {

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return  res.status(400).json({errors: errors.array()});
        }

        const validUser = await User.findOne({where: {userId: userId}})
        if (!validUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const validSpecialist = await Specialist.findOne({where: {specialistId: specialistId}})
        if (!validSpecialist) {
            return res.status(404).json({ success: false, message: 'Specialist not found' });
        }

        
        const newReview = await Reviews.create({
            specialistId,
            userId,
            reviewText,
            reviewRating
        });

        // Update the specialist's ratings
        await updateSpecialistRatings(specialistId);

        return res.status(201).json({success: true, message: "Review posted", data:newReview});
    } catch (error) {
        console.error('Error creating review:', error);
        return res.status(500).json({ succes: false, message: 'Failed to create review', data:error });
    }
};

// Get all reviews for a specific doctor
const getSpecialistReviews = async (req, res) => {
    const { specialistId } = req.params;

    try {

        if(!specialistId){
            return res.status(400).json({success: false, message: "Id must not me empty", data:null});
        }

        const reviews1 = await Reviews.findAll({
            where: { specialistId: specialistId },
        });

        // Fetch user name for each review 
        const reviews = await Promise.all(reviews1.map(async (review) => { 
            const user = await User.findOne({ where: { userId: review.userId } }); 
            if (user) { 
                review.dataValues.userName = `${user.fname} ${user.lname}`; 
            } 
            return review; 
        }));
        
        return res.status(200).json({success: true, message: "Review received", data:reviews});
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return res.status(500).json({succes: false, message: 'Failed to fetch reviews', data:error });
    }
};

// Delete a review by ID
const deleteReview = async (req, res) => {
    const { id } = req.params;

    try {

        if(!id){
            return res.status(400).json({success: false, message: "Id must not me empty", data:null});
        }

        const deletedCount = await Reviews.destroy({
            where: { id: id }
        });

        if (deletedCount === 0) {
            return res.status(404).json({succes: false, message: 'Review not found' });
        }

        return res.status(204).json({succes: true, message: "review deleted"});
    } catch (error) {
        console.error('Error deleting review:', error);
        return res.status(500).json({succes: false, message: 'Failed to delete review', data:error });
    }
};

// Function to update the specialist's average rating and total rating
const updateSpecialistRatings = async (specialistId) => {
    const reviews = await Reviews.findAll({
        where: { specialistId: specialistId }
    });

    const totalRating = reviews.length;
    const averageRating = totalRating > 0 
                          ? reviews.reduce((acc, review) => acc + review.reviewRating, 0) / totalRating 
                          : 0;

    await Specialist.update(
      { averageRating, totalRating },
      { where: { specialistId: specialistId } }
    );
};

module.exports = {
    createReview,
    getSpecialistReviews,
    deleteReview
};