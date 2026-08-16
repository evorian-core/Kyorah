import pool from "../config/database.js";


/* =========================================================
   USUÁRIO NORMAL
========================================================= */


/* ===========================
   LISTAR CHATS
=========================== */

export async function getChats(
    userId
) {

    const result =
        await pool.query(
            `
            SELECT
                id,
                title,
                created_at,
                updated_at

            FROM chats

            WHERE user_id = $1

            ORDER BY
                updated_at DESC
            `,
            [
                userId,
            ]
        );


    return result.rows;

}


/* ===========================
   CRIAR CHAT
=========================== */

export async function createChat(
    userId,
    title = "Nova conversa"
) {

    const result =
        await pool.query(
            `
            INSERT INTO chats
            (
                user_id,
                title
            )

            VALUES
            (
                $1,
                $2
            )

            RETURNING *
            `,
            [
                userId,
                title,
            ]
        );


    return result.rows[0];

}


/* ===========================
   VERIFICAR ACESSO AO CHAT
=========================== */

/*
 * Verifica se o chat pertence ao
 * usuário autenticado.
 */

export async function verifyUserChatAccess(
    chatId,
    userId
) {

    const result =
        await pool.query(
            `
            SELECT
                id

            FROM chats

            WHERE id = $1

            AND user_id = $2

            LIMIT 1
            `,
            [
                chatId,
                userId,
            ]
        );


    return result.rows.length > 0;

}


/* ===========================
   EXCLUIR CHAT
=========================== */

export async function deleteChat(
    chatId,
    userId
) {

    const client =
        await pool.connect();


    try {

        await client.query(
            "BEGIN"
        );


        /*
         * As mensagens seriam removidas
         * automaticamente pelo ON DELETE CASCADE.
         *
         * Mesmo assim, removemos explicitamente
         * para manter o comportamento previsível.
         */

        await client.query(
            `
            DELETE FROM messages

            WHERE chat_id = $1
            `,
            [
                chatId,
            ]
        );


        /*
         * Remove somente o chat
         * pertencente ao usuário.
         */

        await client.query(
            `
            DELETE FROM chats

            WHERE id = $1

            AND user_id = $2
            `,
            [
                chatId,
                userId,
            ]
        );


        await client.query(
            "COMMIT"
        );

    }

    catch (err) {

        await client.query(
            "ROLLBACK"
        );

        throw err;

    }

    finally {

        client.release();

    }

}


/* =========================================================
   BETA
========================================================= */

/*
 * O Beta não possui uma conta em users.
 *
 * Como o schema atual exige:
 *
 * chats.user_id -> users.id
 *
 * usamos uma conta técnica:
 *
 * beta@kyorah.local
 *
 * Os chats continuam tendo UUIDs reais.
 *
 * O betaId é identificado através do título.
 */


/* ===========================
   OBTER USUÁRIO BETA SYSTEM
=========================== */

async function getBetaSystemUser() {

    const result =
        await pool.query(
            `
            SELECT
                id

            FROM users

            WHERE email = $1

            LIMIT 1
            `,
            [
                "beta@kyorah.local",
            ]
        );


    /*
     * Conta já existe.
     */

    if (
        result.rows.length > 0
    ) {

        return result.rows[0].id;

    }


    /*
     * Conta ainda não existe.
     */

    const created =
        await pool.query(
            `
            INSERT INTO users
            (
                name,
                email,
                password_hash,
                plan
            )

            VALUES
            (
                'Kyorah Beta',
                'beta@kyorah.local',
                'BETA_SYSTEM_ACCOUNT',
                'beta'
            )

            RETURNING id
            `
        );


    return created.rows[0].id;

}


/* =========================================================
   CRIAR CHAT BETA
========================================================= */

export async function createBetaChat(
    betaUser,
    title = "Kyorah Beta"
) {

    /*
     * Garante que a conta técnica existe.
     */

    const userId =
        await getBetaSystemUser();


    /* ===========================
       DESCOBRIR NÚMERO
    =========================== */

    const countResult =
        await pool.query(
            `
            SELECT
                COUNT(*) AS total

            FROM chats

            WHERE user_id = $1

            AND title LIKE $2
            `,
            [
                userId,
                `%${betaUser.betaId}%`,
            ]
        );


    const total =
        Number(
            countResult.rows[0].total
        );


    const conversationNumber =
        total + 1;


    /* ===========================
       TÍTULO
    =========================== */

    const betaTitle =
        `${title} • ${betaUser.betaId} — Conversa ${conversationNumber}`;


    console.log(
        "🧬 Criando chat Beta:",
        betaTitle
    );


    /* ===========================
       INSERT
    =========================== */

    const result =
        await pool.query(
            `
            INSERT INTO chats
            (
                user_id,
                title
            )

            VALUES
            (
                $1,
                $2
            )

            RETURNING *
            `,
            [
                userId,
                betaTitle,
            ]
        );


    return result.rows[0];

}


/* ===========================
   VERIFICAR ACESSO AO CHAT BETA
=========================== */

/*
 * Confirma que o chat:
 *
 * 1. pertence à conta técnica Beta;
 * 2. pertence ao betaId autenticado.
 */

export async function verifyBetaChatAccess(
    chatId,
    betaUser
) {

    if (
        !betaUser?.betaId
    ) {

        return false;

    }


    const userId =
        await getBetaSystemUser();


    const result =
        await pool.query(
            `
            SELECT
                id

            FROM chats

            WHERE id = $1

            AND user_id = $2

            AND title LIKE $3

            LIMIT 1
            `,
            [
                chatId,
                userId,
                `%${betaUser.betaId}%`,
            ]
        );


    return result.rows.length > 0;

}


/* =========================================================
   LISTAR CHATS BETA
========================================================= */

export async function getBetaChats(
    betaUser
) {

    const userId =
        await getBetaSystemUser();


    const result =
        await pool.query(
            `
            SELECT
                id,
                title,
                created_at,
                updated_at

            FROM chats

            WHERE user_id = $1

            AND title LIKE $2

            ORDER BY
                updated_at DESC
            `,
            [
                userId,
                `%${betaUser.betaId}%`,
            ]
        );


    return result.rows;

}


/* =========================================================
   EXCLUIR CHAT BETA
========================================================= */

export async function deleteBetaChat(
    chatId,
    betaUser
) {

    const userId =
        await getBetaSystemUser();


    console.log(
        "🗑️ Excluindo chat Beta:",
        chatId
    );


    /*
     * O betaId é usado para garantir
     * que o Beta só possa apagar
     * seus próprios chats.
     */

    const result =
        await pool.query(
            `
            DELETE FROM chats

            WHERE id = $1

            AND user_id = $2

            AND title LIKE $3

            RETURNING id
            `,
            [
                chatId,
                userId,
                `%${betaUser.betaId}%`,
            ]
        );


    /*
     * Nenhum chat encontrado.
     */

    if (
        result.rows.length === 0
    ) {

        throw new Error(
            "Chat Beta não encontrado ou não pertence ao usuário."
        );

    }


    console.log(
        "✅ Chat Beta excluído:",
        chatId
    );


    return true;

}
