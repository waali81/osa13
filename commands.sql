CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes)
VALUES (
  'Matti Meikäläinen',
  'https://example.com/blog1',
  'Learning PostgreSQL',
  5
);

INSERT INTO blogs (author, url, title, likes)
VALUES (
  'Liisa Virtanen',
  'https://example.com/blog2',
  'Getting Started with React',
  12
);

SELECT * FROM blogs;