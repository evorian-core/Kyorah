import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

/**
 * Criptografa uma senha
 */
export async function hashPassword(password) {

    return await bcrypt.hash(
        password,
        SALT_ROUNDS
    );

}

/**
 * Compara senha digitada com senha do banco
 */
export async function comparePassword(
    password,
    hashedPassword
) {

    return await bcrypt.compare(
        password,
        hashedPassword
    );

}