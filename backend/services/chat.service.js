import pool from "../config/database.js";

/**
 * Cria uma conversa
 */
export async function createChat(userId, title = "Nova conversa") {

    const { rows } = await pool.query(

        `
        INSERT INTO chats
        (user_id,title)

        VALUES
        ($1,$2)

        RETURNING *
        `,

        [

            userId,

            title,

        ]

    );

    return rows[0];

}

/**
 * Busca todas as conversas
 */
export async function getChats(userId) {

    const { rows } = await pool.query(

        `
        SELECT *

        FROM chats

        WHERE user_id=$1

        ORDER BY updated_at DESC
        `,

        [

            userId,

        ]

    );

    return rows;

}

/**
 * Busca uma conversa
 */
export async function getChat(chatId) {

    const { rows } = await pool.query(

        `
        SELECT *

        FROM chats

        WHERE id=$1
        `,

        [

            chatId,

        ]

    );

    return rows[0];

}