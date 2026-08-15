-- ============================
-- KYORAH DATABASE
-- EVORIAN • OMNIA
-- ============================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS chats CASCADE;
DROP TABLE IF EXISTS memories CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE IF NOT EXISTS users (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(120) NOT NULL,

    email VARCHAR(255) UNIQUE NOT NULL,

    password_hash TEXT NOT NULL,

    age_group VARCHAR(20),

    avatar TEXT,

    plan VARCHAR(20) NOT NULL DEFAULT 'free',

    last_login TIMESTAMP,

    created_at TIMESTAMP DEFAULT NOW(),

    updated_at TIMESTAMP DEFAULT NOW()

);



CREATE TABLE IF NOT EXISTS chats (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID
        REFERENCES users(id)
        ON DELETE CASCADE,

    beta_id VARCHAR(20),

    title VARCHAR(255)
        DEFAULT 'Nova conversa',

    created_at TIMESTAMP
        DEFAULT NOW(),

    updated_at TIMESTAMP
        DEFAULT NOW(),

    CONSTRAINT chats_owner_check
    CHECK (
        user_id IS NOT NULL
        OR beta_id IS NOT NULL
    )

);



CREATE TABLE IF NOT EXISTS messages (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    chat_id UUID NOT NULL
        REFERENCES chats(id)
        ON DELETE CASCADE,

    role VARCHAR(20) NOT NULL,

    type VARCHAR(20) NOT NULL DEFAULT 'text',

    content TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT NOW()

);



CREATE TABLE IF NOT EXISTS memories (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    content TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT NOW()

);



CREATE TABLE IF NOT EXISTS subscriptions (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,

    plan VARCHAR(20) NOT NULL DEFAULT 'free',

    active BOOLEAN DEFAULT TRUE,

    expires_at TIMESTAMP,

    created_at TIMESTAMP DEFAULT NOW()

);