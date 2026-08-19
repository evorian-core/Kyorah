import jwt from "jsonwebtoken";


const BETA_USERS = {

    "Beta-001": {
        name: "Ana Paula Orlovski",
        code: "Q4V9_x2K",
    },

    "Beta-002": {
        name: "Emanueli",
        code: "N7A1_z8P",
    },

    "Beta-003": {
        name: "Isadora Portela",
        code: "J7M5_xx0",
    },

    "Beta-004": {
        name: "João Lucas Ribeiro",
        code: "K2R8_v1Q",
    },

    "Beta-005": {
        name: "Letícia Mariele Vandoski",
        code: "X9F3_m7A",
    },

    "Beta-006": {
        name: "Nicoli Denck Camargo",
        code: "P5L1_q8Z",
    },

    "Beta-007": {
        name: "Valéria Palhano",
        code: "V3T6_n2R",
    },

    "Beta-009": {
    name: "Williandro",
    code: "WiM.S_Ce0",
},

};


export default function betaOrAuthMiddleware(
    req,
    res,
    next
) {

    console.log(
        "========== BETA/AUTH DEBUG =========="
    );


    /* ===========================
       1. JWT NORMAL
    =========================== */

    const authHeader =
        req.headers.authorization;


    if (authHeader) {

        const token =
            authHeader.replace(
                "Bearer ",
                ""
            );


        try {

            const decoded =
                jwt.verify(
                    token,
                    process.env.JWT_SECRET
                );


            console.log(
                "✅ JWT válido"
            );


            req.user =
                decoded;


            return next();

        }

        catch {

            console.log(
                "⚠️ JWT inválido, tentando Beta..."
            );

        }

    }


    /* ===========================
       2. BETA
    =========================== */

    const betaAccess =
        req.headers["x-beta-access"];


    /*
     * Para GET não existe body.
     *
     * Então recebemos os dados Beta
     * através dos headers.
     */

    let betaUser =
        req.body?.betaUser;


    if (!betaUser) {

        const betaId =
            req.headers["x-beta-id"];

        const name =
            req.headers["x-beta-name"];

        const code =
            req.headers["x-beta-code"];


        if (
            betaId &&
            name &&
            code
        ) {

            betaUser = {

                betaId,

                name,

                code,

            };

        }

    }


    /* ===========================
       VALIDAR ACESSO
    =========================== */

    if (
        betaAccess !== "true" ||
        !betaUser
    ) {

        console.log(
            "❌ Nenhum acesso válido"
        );


        return res.status(
            401
        ).json({

            success: false,

            message:
                "Autenticação necessária.",

        });

    }


    /* ===========================
       VALIDAR BETA
    =========================== */

    const registeredBeta =
        BETA_USERS[
            betaUser.betaId
        ];


    if (!registeredBeta) {

        console.log(
            "❌ Beta ID inválido:",
            betaUser.betaId
        );


        return res.status(
            401
        ).json({

            success: false,

            message:
                "Beta não encontrado.",

        });

    }


    if (
        registeredBeta.name !==
        betaUser.name
    ) {

        console.log(
            "❌ Nome do Beta inválido"
        );


        return res.status(
            401
        ).json({

            success: false,

            message:
                "Identidade Beta inválida.",

        });

    }


    if (
        registeredBeta.code !==
        betaUser.code
    ) {

        console.log(
            "❌ Código Beta inválido"
        );


        return res.status(
            401
        ).json({

            success: false,

            message:
                "Código Beta inválido.",

        });

    }


    /* ===========================
       BETA VALIDADO
    =========================== */

    console.log(
        "✅ BETA VALIDADO:",
        betaUser.betaId
    );


    req.betaUser =
        betaUser;


    return next();

}