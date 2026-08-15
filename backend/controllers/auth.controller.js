import { register, login } from "../services/auth.service.js";

export async function registerController(req, res) {

    console.log("🔥 REGISTER CHAMADO");
    console.log(req.body);

    try {

        const user = await register(req.body);

        return res.status(201).json({
            success: true,
            user,
        });

    } catch (error) {

    console.error("========== REGISTER ERROR ==========");
    console.error(error);

    return res.status(400).json({
        success: false,
        message: error.message,
    });

    }
}

export async function loginController(req, res) {

    try {

        const data = await login(req.body);

        return res.json({
            success: true,
            ...data,
        });

    } catch (error) {

        console.error("========== LOGIN ERROR ==========");
        console.error(error);

        return res.status(401).json({
            success: false,
            message: error.message,
        });

    }
}