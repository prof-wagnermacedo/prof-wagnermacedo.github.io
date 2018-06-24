CREATE TABLE Funcionarios (
  id      INT IDENTITY,
  nome    VARCHAR(100) NOT NULL,
  salario REAL         NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Dependentes (
  id             INT IDENTITY,
  nome           VARCHAR(100) NOT NULL,
  idade          INT          NOT NULL,
  funcionario_id INT          NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (funcionario_id) REFERENCES Funcionarios (id)
);

INSERT INTO Funcionarios (id, nome, salario)
VALUES
  (1, 'Alana Ferreira', 2868.00),
  (2, 'André Novaes', 9704.00),
  (3, 'Carolina Alves Vieira', 6302.00),
  (4, 'Daniel Costa', 1272.00),
  (5, 'Emilly Costela', 4029.00),
  (6, 'Gabrielly da Paz', 4076.00),
  (7, 'Isabel Teixeira', 4022.00),
  (8, 'João Guilherme da Cruz', 6285.00),
  (9, 'Juliana Lopes', 6928.00),
  (10, 'Juliana Nogueira', 8211.00),
  (11, 'Kaique Araújo', 2149.00),
  (12, 'Kamilly Jesus', 9979.00),
  (13, 'Laís Peixoto', 4615.00),
  (14, 'Melissa Almeida', 4911.00),
  (15, 'Mirella Vieira', 9415.00),
  (16, 'Murilo Alves', 1610.00),
  (17, 'Nicole Cavalcanti', 5039.00),
  (18, 'Pedro Miguel Duarte', 4176.00),
  (19, 'Renan da Luz', 1831.00),
  (20, 'Thales Ramos', 8003.00);

INSERT INTO Dependentes (nome, idade, funcionario_id)
VALUES
  ('Igor Ferreira', 6, 1),
  ('Ana Júlia Novaes', 1, 2),
  ('Ana Laura Novaes', 3, 2),
  ('Enzo Gabriel Novaes', 2, 2),
  ('Leonardo Costa', 10, 4),
  ('Enzo Gabriel da Cruz', 16, 8),
  ('Joana Nogueira', 13, 10),
  ('Lucca Nogueira', 15, 10),
  ('Raul da Luz', 4, 19);
