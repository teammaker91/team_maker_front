import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User"

export const register = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const existing = await User.findOne({email});
        if(existing) return res.status(400).json({msg: "Email already used"});
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hash
        });
        return res.satus(201).json({ msg: "User created"});

    }
    catch(err) {
        return res.status(500).json({msg: "Server error, no user created?"});
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({ msg: "Invalid credentials"});

        const valid = await bcrypt.compare(password, user.password);
        if(!valid) return res.status(400).json({
            msg: "Invalid credentials"
        });

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );
        return res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch(err) {
        return res.status(500).json({ msg: "Server error User can't login"});
    }
};