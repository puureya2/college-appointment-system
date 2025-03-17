import express from "express";
import { authenticate, authorize } from "../../middleware/authentication.js";
import {
    createAppointment,
    bookAppointment,
    getAppointment,
    getAllAppointments,
    getUserAppointments,
    cancelAppointment,
    deleteAppointment,
    deleteAllAppointments,
} from "./appointmentController.js";

const router = express.Router();


// Single Appointment Routes
router.post("/", authenticate, authorize("professor"), createAppointment);
router.get("/:id", authenticate, getAppointment(null));
router.put("/:id/book", authenticate, authorize("student"), bookAppointment);
router.put("/:id/cancel", authenticate, cancelAppointment);
router.delete("/:id", authenticate, authorize("professor"), deleteAppointment);

// User-Specific Appointment Routes
router.get("/user/:id", authenticate, getUserAppointments("all", true));
router.get("/user/:id/pending", authenticate, getUserAppointments(true, null));
router.get("/user/:id/non-pending", authenticate, getUserAppointments(false, null));

// Admin Routes
router.get("/", authenticate, authorize("admin"), getAllAppointments(null, null));
router.get("/pending", authenticate, authorize("admin"), getAllAppointments(true, null));
router.get("/non-pending", authenticate, authorize("admin"), getAllAppointments(false, null));

router.put("/cancel-all", authenticate, authorize("admin"), deleteAllAppointments(true));
router.delete("/", authenticate, authorize("admin"), deleteAllAppointments(null));
router.delete("/pending", authenticate, authorize("admin"), deleteAllAppointments(true));
router.delete("/non-pending", authenticate, authorize("admin"), deleteAllAppointments(false));


export default router;
