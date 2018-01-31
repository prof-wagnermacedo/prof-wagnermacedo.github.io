CREATE TABLE Posts (
  id      INT PRIMARY KEY IDENTITY,
  titulo  VARCHAR(100) UNIQUE        NOT NULL,
  horario DATETIME DEFAULT GETDATE() NOT NULL,
  texto   TEXT                       NOT NULL
)
