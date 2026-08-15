import pool from "../config/database.js";

/**
 * Busca usuário pelo e-mail
 */
export async function findUserByEmail(email) {

  const { rows } = await pool.query(

    `
    SELECT *
    FROM users
    WHERE email = $1
    LIMIT 1
    `,

    [email]

  );

  return rows[0] || null;

}

/**
 * Busca usuário pelo ID
 */
export async function findUserById(id) {

  const { rows } = await pool.query(

    `
    SELECT *
    FROM users
    WHERE id = $1
    LIMIT 1
    `,

    [id]

  );

  return rows[0] || null;

}

/**
 * Cria um usuário
 */
export async function createUser({
  name,
  email,
  passwordHash,
  ageGroup,
}) {

  console.log("CRIANDO USUÁRIO...");

  const { rows } = await pool.query(
    `
    INSERT INTO users
    (
      name,
      email,
      password_hash,
      age_group,
      plan
    )
    VALUES
    ($1,$2,$3,$4,'free')
    RETURNING
      id,
      name,
      email,
      age_group,
      plan,
      created_at
    `,
    [
      name,
      email,
      passwordHash,
      ageGroup,
    ]
  );

  console.log("USUÁRIO CRIADO:", rows[0]);

  const allUsers = await pool.query(`
    SELECT id, email
    FROM users
  `);

  console.log("USUÁRIOS NO BANCO AGORA:", allUsers.rows);

  return rows[0];
}