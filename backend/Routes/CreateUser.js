const express = require('express');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt=require('jsonwebtoken');
const jwtSecret="MYnakeishelloblabla";
// User registration route
router.post("/createuser", [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('name').isLength({ min: 5 }).withMessage('Name must be at least 5 characters long'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ Success: false, errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);

    try {
        await User.create({
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            password: secPassword // Hash the password before saving it
        });
        res.json({ Success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ Success: false, message: 'Internal server error' });
    }
});

// User login route
router.post("/loginuser", [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ Success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log("User found:", user);

        if (!user) {
            return res.status(400).json({ Success: false, errors: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ Success: false, errors: "Invalid credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, jwtSecret);
        return res.json({ Success: true, authToken: authToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ Success: false, message: 'Internal server error' });
    }
});


module.exports = router;