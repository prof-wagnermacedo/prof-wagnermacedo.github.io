CREATE TABLE Tarefas (
  id        INT PRIMARY KEY IDENTITY,
  descricao VARCHAR(30)   NOT NULL,
  concluida BIT DEFAULT 0 NOT NULL
)
