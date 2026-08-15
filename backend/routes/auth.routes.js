import express from "express";

import {

    registerController,

    loginController,

} from "../controllers/auth.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * Criar conta
 */

router.post(

    "/register",

    registerController

);

/**
 * Login
 */

router.post(

    "/login",

    loginController

);

/**
 * Usuário autenticado
 */

router.get(

    "/me",

    authMiddleware,

    (req, res) => {

        res.json({

            success: true,

            user: req.user,

        });

    }

);

export default router;