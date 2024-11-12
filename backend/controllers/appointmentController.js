const { Appointments, User, Specialist } = require("../database/db");

// Create a new appointment
const createAppointment = async (req, res) => {
    const {userId, specialistId} = req.params;
    const { appointmentDate } = req.body;

    try {
        if(!userId || !specialistId){
            return res.status(400).json({success: false, message: "Id must not me empty", data:null});
        }

        // Validate user and specialist existence
        const userExists = await User.findByPk(userId);
        const specialistExists = await Specialist.findByPk(specialistId);

        if (!userExists) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!specialistExists) {
            return res.status(404).json({ success: false, message: "Specialist not found" });
        }

        // Create the appointment
        const newAppointment = await Appointments.create({
            userId,
            specialistId,
            appointmentDate
        });

        return res.status(201).json({ success: true, message: "Appointment created", data: newAppointment });
    } catch (error) {
        console.error('Error creating appointment:', error);
        return res.status(500).json({ success: false, message: "Failed to create appointment", data: null });
    }
};

// Get all appointments
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointments.findAll();

        return res.status(200).json({ success: true, message: "Appointments retrieved", data: appointments });
    } catch (error) {
        console.error('Error fetching appointments:', error);
        return res.status(500).json({ success: false, message: "Failed to fetch appointments", data: null });
    }
};

// Get appointments for a specific user
const getAppointmentsByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        if(!userId){
            return res.status(400).json({success: false, message: "Id must not me empty", data:null});
        }

        const appointments1 = await Appointments.findAll({
            where: { userId: userId },
            order: [['appointmentDate', 'DESC']],
        });

        if (appointments1.length === 0) {
            return res.status(200).json({ success: false, message: "No appointments found for this user", data: null });
        }
       
        // Filter out past appointments 
        const now = new Date(); 
        const futureAppointments = appointments1.filter(appointment => new Date(appointment.appointmentDate) > now);

        // Fetch specialist details for each appointment 
        const appointments = await Promise.all(futureAppointments.map(async (appointment) => { 
            const specialist = await Specialist.findOne({ where: { specialistId: appointment.specialistId } }); 
            if (specialist) { 
                appointment.dataValues.specialistName = `${specialist.fname} ${specialist.lname}`; 
            } 
            return appointment; 
        }));

        return res.status(200).json({ success: true, message: "Appointments found", data: appointments });
    } catch (error) {
        console.error('Error fetching appointments for user:', error);
        return res.status(500).json({ success: false, message: "Failed to fetch appointments", data: null });
    }
};

// Get appointments for a specific specialist
const getAppointmentsBySpecialist = async (req, res) => {
    const { specialistId } = req.params;

    try {
        if(!specialistId){
            return res.status(400).json({success: false, message: "Id must not me empty", data:null});
        }

        const appointments1 = await Appointments.findAll({
            where: { specialistId: specialistId,
                     appointmentStatus: 'accepted'
             },
            order: [['appointmentDate', 'ASC']],
        });

        if (appointments1.length === 0) {
            return res.status(404).json({ success: false, message: "No appointments found for this specialist", data: null });
        }

        // Filter out past appointments 
        const now = new Date(); 
        const futureAppointments = appointments1.filter(appointment => new Date(appointment.appointmentDate) > now);

        // Fetch specialist details for each appointment 
        const appointments = await Promise.all(futureAppointments.map(async (appointment) => { 
            const patient = await User.findOne({ where: { userId: appointment.userId } }); 
            if (patient) { 
                appointment.dataValues.userName = `${patient.fname} ${patient.lname}`; 
            } 
            return appointment; 
        }));

        return res.status(200).json({ success: true, message: "Appointments found", data: appointments });
    } catch (error) {
        console.error('Error fetching appointments for specialist:', error);
        return res.status(500).json({ success: false, message: "Failed to fetch appointments", data: null });
    }
};

// Get pending appointments for a specific specialist
const getPendingAppointments = async (req, res) => {
    const { specialistId } = req.params;

    try {
        if(!specialistId){
            return res.status(400).json({success: false, message: "Id must not me empty", data:null});
        }

        const appointments1 = await Appointments.findAll({
            where: { specialistId: specialistId,
                     appointmentStatus: 'pending'
             },
            order: [['appointmentDate', 'DESC']],
        });

        if (appointments1.length === 0) {
            return res.status(404).json({ success: false, message: "No appointments found for this specialist", data: null });
        }

        // Filter out past appointments 
        const now = new Date(); 
        const futureAppointments = appointments1.filter(appointment => new Date(appointment.appointmentDate) > now);

        // Fetch specialist details for each appointment 
        const appointments = await Promise.all(futureAppointments.map(async (appointment) => { 
            const patient = await User.findOne({ where: { userId: appointment.userId } }); 
            if (patient) { 
                appointment.dataValues.userName = `${patient.fname} ${patient.lname}`; 
            } 
            return appointment; 
        }));

        return res.status(200).json({ success: true, message: "Appointments found", data: appointments });
    } catch (error) {
        console.error('Error fetching appointments for specialist:', error);
        return res.status(500).json({ success: false, message: "Failed to fetch appointments", data: null });
    }
};

// Get a single appointment by ID
const getAppointmentById = async (req, res) => {
    const { id } = req.params;

    try {
        if(!id){
            return res.status(400).json({success: false, message: "Id must not me empty", data:null});
        }

        const appointment = await Appointments.findByPk(id);

        if (!appointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        return res.status(200).json({ success: true, message: "Appointment found", data: appointment });
    } catch (error) {
        console.error('Error fetching appointment:', error);
        return res.status(500).json({ success: false, message: "Failed to fetch appointment", data: null });
    }
};


// Delete an appointment
const deleteAppointment = async (req, res) => {
    const { id } = req.params;

    try {
        if(!id){
            return res.status(400).json({success: false, message: "Id must not me empty", data:null});
        }
        
        const deletedCount = await Appointments.destroy({
            where: { appointmentId: id }
        });

        if (deletedCount) {
            return res.status(200).json({ success: true, message: "Appointment deleted" });
        }

        return res.status(404).json({ success: false, message: "Appointment not found" });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        return res.status(500).json({ success: false, message: "Failed to delete appointment", data: null });
    }
};

const updateAppointment = async (req, res) => {
    const { id } = req.params;
    const { appointmentStatus } = req.body;

    try {
        if (!id) {
            return res.status(400).json({ success: false, message: "Id must not be empty", data: null });
        }

        // Find the appointment by ID and update its status
        const [updatedRows] = await Appointments.update({ appointmentStatus }, {
            where: { appointmentId: id }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ success: false, message: "Appointment not found", data: null });
        }

        // Fetch the updated appointment
        const updatedApp = await Appointments.findOne({ where: { appointmentId: id } });

        res.status(200).json({ success: true, message: "Successfully updated", data: updatedApp });
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(500).json({ success: false, message: "Failed to update", data: null });
    }
};

module.exports = {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    getAppointmentsBySpecialist,
    getAppointmentsByUser,
    deleteAppointment,
    getPendingAppointments,
    updateAppointment
}