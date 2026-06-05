-- Schema do banco de dados atualizado
-- psql -h localhost -U postgres -d lectio -f schema.sql

CREATE TABLE IF NOT EXISTS users (
  email VARCHAR(200) PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  password VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  author VARCHAR(200) NOT NULL,
  resume TEXT,
  total_pages INT,
  assessment FLOAT,
  user_email VARCHAR(200) NOT NULL REFERENCES users(email) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS reading_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email VARCHAR(200) NOT NULL REFERENCES users(email) ON DELETE CASCADE ON UPDATE CASCADE,
  book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  current_page INT DEFAULT 0,
  status VARCHAR(50),
  date_start DATE,
  date_end DATE
);

CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  color VARCHAR(7) DEFAULT '#5aaefd',
  user_email VARCHAR(200) NOT NULL REFERENCES users(email) ON DELETE CASCADE ON UPDATE CASCADE,
  name VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS books_categories (
  book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (book_id, category_id)
);