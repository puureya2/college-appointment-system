import Appointment from "../../models/Appointment.js";


// get appointment
export const getAppointment = (populateFields = null) => async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const { id, role } = req.user;

        let query = Appointment.findById(appointmentId);

        if (populateFields) {
            query = query.populate(populateFields);
        }

        const appointment = await query;
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        // Admins can access any appointment
        if (role !== "admin" && appointment.professor.toString() !== id && appointment.student?.toString() !== id) {
            return res.status(403).json({ message: "Access denied" });
        }

        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// get all appointments
export const getAllAppointments = (pending = null, populateFields = null) => async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }

        let query = Appointment.find(pending !== null ? { pending: pending } : {});

        if (populateFields) {
            query = query.populate(populateFields);
        }

        const appointments = await query;
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getUserAppointments = (pending = null, populate = null) => async (req, res) => {
    try {
        const { id, role } = req.user;
        const userId = req.params.id;

        if (role !== "admin" && id !== userId) {
            return res.status(403).json({ message: "Access denied" });
        }

        let query = Appointment.find({
            $or: [{ professor: userId }, { student: userId }],
            ...(pending !== null && { pending: pending }),
        });

        if (populate) {
            query = query.populate(populate);
        }

        const appointments = await query;
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// create an appointment
export const createAppointment = async (req, res) => {
    try {
        if (req.user.role !== "professor") {
            return res.status(403).json({ message: "Only professors can create appointments" });
        }

        const { date } = req.body;
        const appointment = new Appointment({
            professor: req.user.id,
            date,
            pending: false,
        });

        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// book an appointment
export const bookAppointment = async (req, res) => {
    try {
        if (req.user.role !== "student") {
            return res.status(403).json({ message: "Only students can book appointments" });
        }

        const appointment = await Appointment.findById(req.params.id);

        if (!appointment || appointment.pending) {
            return res.status(400).json({ message: "Invalid appointment booking" });
        }

        appointment.student = req.user.id;
        appointment.pending = true;
        await appointment.save();

        res.json({ message: "Appointment booked", appointment });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// cancel appointment
export const cancelAppointment = async (req, res) => {
    try {
        const { id, role } = req.user;
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        if (role !== "admin" && appointment.professor.toString() !== id && appointment.student?.toString() !== id) {
            return res.status(403).json({ message: "Access denied" });
        }

        appointment.pending = false;
        await appointment.save();

        res.json({ message: "Appointment cancelled" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// delete appointment
export const deleteAppointment = async (req, res) => {
    try {
        const { id, role } = req.user;
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        if (role !== "admin" && appointment.professor.toString() !== id) {
            return res.status(403).json({ message: "Only professors can delete their own appointments" });
        }

        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: "Appointment deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// delete all appointments
export const deleteAllAppointments = (pending = null) => async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }

        await Appointment.deleteMany(pending !== null ? { pending: pending } : {});
        res.json({ message: "Appointments deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
