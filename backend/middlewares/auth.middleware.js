import jwt from "jsonwebtoken";

export default function authMiddleware(
    req,
    res,
    next
) {

    const authHeader = req.headers.authorization;

    console.log("========== AUTH DEBUG ==========");
    console.log("Authorization:", authHeader);

    if (!authHeader) {

        console.log("❌ Token não enviado");

        return res.status(401).json({

            success: false,

            message: "Token não informado.",

        });

    }


    const token = authHeader.replace(
        "Bearer ",
        ""
    );


    try {

        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET

        );


        console.log("✅ Token válido:");
        console.log(decoded);


        req.user = decoded;


        next();


    }

    catch(error) {

        console.log("❌ Erro JWT:");
        console.log(error.message);


        return res.status(401).json({

            success: false,

            message: "Token inválido.",

        });

    }

}