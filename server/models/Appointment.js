import mongoose from "mongoose";


const appointmentSchema = new mongoose.Schema({

    professor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    student: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        default: null 
    },
    date: { 
        type: Date, 
        required: true 
    },
    pending: { 
        type: Boolean, 
        default: true 
    }

}, { timestamps: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
