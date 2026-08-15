import jwt from "jsonwebtoken";

const SECRET =
    process.env.JWT_SECRET;

    console.log("JWT SECRET TOKEN:", SECRET);

/**
 * Gera um token JWT
 */
export function generateToken(user) {

    return jwt.sign(

        {
            id: user.id,
            email: user.email,
            plan: user.plan,
        },

        SECRET,

        {
            expiresIn: "30d",
        }

    );

}

/**
 * Valida um token
 */
export function verifyToken(token) {

    return jwt.verify(
        token,
        SECRET
    );

}