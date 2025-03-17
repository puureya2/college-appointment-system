import express from "express";
import { authenticate, authorize } from "../../middleware/authentication.js";
import { 
    login, 
    getUser, 
    getAllUsers, 
    createUser, 
    updateUser, 
    deleteUser, 
    deleteAllUsers 
} from "./userController.js";

const router = express.Router();


// Authentication Routes
router.post("/login", login);

// User Management Routes
router.post("/register", createUser);
router.get("/:id", authenticate, getUser(null));
router.put("/:id", authenticate, updateUser);
router.delete("/:id", authenticate, deleteUser);

// Admin-Only User Management Routes
router.get("/", authenticate, authorize("admin"), getAllUsers("all", null));
router.get("/students", authenticate, authorize("admin"), getAllUsers("student", null));
router.get("/professors", authenticate, authorize("admin"), getAllUsers("professor", null));
router.delete("/", authenticate, authorize("admin"), deleteAllUsers("all"));
router.delete("/students", authenticate, authorize("admin"), deleteAllUsers("student"));
router.delete("/professors", authenticate, authorize("admin"), deleteAllUsers("professor"));

// Admin-Only Populated User & Appointment Routes
router.get("/:id/appointments", authenticate, getUser("appointments"));
router.get("/appointments", authenticate, authorize("admin"), getAllUsers("all", "appointments"));
router.get("/students/appointments", authenticate, authorize("admin"), getAllUsers("student", "appointments"));
router.get("/professors/appointments", authenticate, authorize("admin"), getAllUsers("professor", "appointments"));

export default router;
