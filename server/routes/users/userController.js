import User from "../../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();


// login
export const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// get user
export const getUser = (populateFields = null) => async (req, res) => {
    try {

        const { id, role } = req.user;
        const userId = req.params.id;

        if (role !== "admin" && id !== userId) {
            return res.status(403).json({ message: "Access denied" });
        }

        let query = User.findById(userId);
        if (populateFields) {
            query = query.populate(populateFields);
        }

        const user = await query;
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// get all users by role
export const getAllUsers = (role = "all", populateFields = null) => async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }

        if (role == "all") {
            role = null;
        }

        let query = role ? User.find({ role }) : User.find({});
    
        if (populateFields) {
            query = query.populate(populateFields);
        }

        const users = await query;
        res.json(users);

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// create user
export const createUser = async (req, res) => {
    try {

        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await user.save();
        res.status(201).json({ message: `${role} registered successfully.` });
    
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// update user
export const updateUser = async (req, res) => {
    try {
        
        const { user_data } = req.body;
        const userId = req.params.id;

        if (role !== "admin" && id !== userId) {
            return res.status(403).json({ message: "Access denied" });
        }

        user = await User.findByIdAndUpdate(userId, { user_data: req.body }, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: `User ${field} updated successfully.`, user });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// delete user
export const deleteUser = async (req, res) => {
    try {
        const { id, role } = req.user;
        const userId = req.params.id;

        if (role !== "admin" && id !== userId) {
            return res.status(403).json({ message: "Access denied" });
        }

        await User.findByIdAndDelete(userId);
        res.json({ message: "User deleted" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// delete all users by role
export const deleteAllUsers = (role = "all") => async (req, res) => {
    try {

        if (role == "all") {
            await User.deleteMany({});
            res.json({ message: "All users deleted" });
        } else {
            await User.deleteMany({ role });
            res.json({ message: `All ${role}s deleted` });
        }

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


