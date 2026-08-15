import pool from "../config/database.js";


/* ===========================
   SALVAR MENSAGEM
=========================== */

export async function saveMessage(
    chatId,
    role,
    content,
    type = "text"
) {

    const { rows } =
        await pool.query(
            `
            INSERT INTO messages
            (
                chat_id,
                role,
                type,
                content
            )

            VALUES
            (
                $1,
                $2,
                $3,
                $4
            )

            RETURNING *
            `,
            [
                chatId,
                role,
                type,
                content,
            ]
        );


    return rows[0];

}


/* ===========================
   EXCLUIR MENSAGENS
=========================== */

export async function deleteMessages(
    chatId
) {

    await pool.query(
        `
        DELETE FROM messages

        WHERE chat_id = $1
        `,
        [
            chatId,
        ]
    );

}


/* ===========================
   MENSAGENS NORMAL
=========================== */

export async function getMessages(
    chatId,
    userId
) {

    const { rows } =
        await pool.query(
            `
            SELECT
                messages.id,
                messages.role,
                messages.type,
                messages.content,
                messages.created_at

            FROM messages

            INNER JOIN chats
                ON chats.id =
                   messages.chat_id

            WHERE messages.chat_id = $1
            AND chats.user_id = $2

            ORDER BY
                messages.created_at ASC
            `,
            [
                chatId,
                userId,
            ]
        );


    return rows;

}


/* ===========================
   MENSAGENS BETA
=========================== */

export async function getBetaMessages(
    chatId,
    betaUser
) {

    const { rows } =
        await pool.query(
            `
            SELECT
                messages.id,
                messages.role,
                messages.type,
                messages.content,
                messages.created_at

            FROM messages

            INNER JOIN chats
                ON chats.id =
                   messages.chat_id

            WHERE messages.chat_id = $1

            AND chats.title LIKE $2

            ORDER BY
                messages.created_at ASC
            `,
            [
                chatId,
                `%${betaUser.betaId}%`,
            ]
        );


    return rows;

}