import {
  hashPassword,
  comparePassword,
} from "../utils/hash.js";

import {
  generateToken,
} from "../utils/jwt.js";

import {
  createUser,
  findUserByEmail,
} from "./user.service.js";

const SALT_ROUNDS = 10;

export async function register({
  name,
  email,
  password,
  ageGroup,
}) {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("Este e-mail já está cadastrado.");
  }

  const passwordHash =
    await hashPassword(password);

  const user = await createUser({
    name,
    email,
    passwordHash,
    ageGroup,
  });

  return user;
}

export async function login({
  email,
  password,
}) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("E-mail ou senha inválidos.");
  }

  const validPassword =
await comparePassword(
    password,
    user.password_hash
);

  if (!validPassword) {
    throw new Error("E-mail ou senha inválidos.");
  }

  const token =
generateToken(user);

  return {
    token,
    user:{
id:user.id,
name:user.name,
email:user.email,
plan:user.plan,
ageGroup:user.age_group
}
  }
}
