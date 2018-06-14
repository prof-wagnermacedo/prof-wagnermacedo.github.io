---
topic: Acesso à Banco de Dados
layout: course
date: 2018-05-07 19:00
part: 3
---

* TOC
{:toc}

## Banco de dados e JDBC

Antes de passar adiante, leia o excelente material da Caelum, sobre [banco de dados e JDBC][caelum-jdbc].

Para entender melhor, tente praticar!!!

[caelum-jdbc]: https://www.caelum.com.br/apostila-java-web/bancos-de-dados-e-jdbc/

## Configurando a conexão ao banco de dados

### Driver JDBC do SQL Server

1. Baixe a biblioteca em <http://central.maven.org/maven2/com/microsoft/sqlserver/mssql-jdbc/6.4.0.jre8/mssql-jdbc-6.4.0.jre8.jar>
2. Dentro do NetBeans, selecione o menu <u>Ferramentas > Bibliotecas</u>.
3. Na janela que aparece, clique em <u>Nova Biblioteca...</u>.
4. Escreva para o nome da biblioteca "Driver JDBC do SQL Server" e clique em <u>OK</u>.
5. Na tela que aparece, clique em <u>Adicionar JAR/Pasta...</u>, escolha o arquivo baixado e depois clique em <u>OK</u>.

### Fazendo o driver como dependência do projeto

1. No projeto NetBeans, clique no botão direito em <u>Bibliotecas</u>, no menu, selecione <u>Adicionar Biblioteca...</u>.
2. Na janela que aparece, escolha "Driver JDBC do SQL Server" e finalize.

**NOTA:** é preciso adicionar a biblioteca em todos os projetos que forem usar o SQL Server.

### Na configuração do Spring

Essa configuração está sendo aplicada ao código feito no [exercício 4](exercicio4.html) 

{: data-caption="AppConfig.java" data-hi="24-34, 36-39" }
```
@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"primavera.dao", "primavera.controller"})
public class AppConfig {

    @Bean
    public ViewResolver jspViewResolver() {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setViewClass(JstlView.class);
        resolver.setPrefix("/WEB-INF/jsp/");
        resolver.setSuffix(".jsp");
        return resolver;
    }

    @Bean
    public MessageSource messageSource() {
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
        messageSource.setBasename("classpath:/messages");
        messageSource.setDefaultEncoding("UTF-8");
        messageSource.setUseCodeAsDefaultMessage(true);
        return messageSource;
    }

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource ds = new DriverManagerDataSource();

        ds.setDriverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        ds.setUrl("jdbc:sqlserver://localhost;databaseName=PJW");
        ds.setUsername("sa");
        ds.setPassword("123456");

        return ds;
    }

    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }

}
```

## Criando o banco de dados e as tabelas

```sql
CREATE DATABASE PJW;
USE PJW;

CREATE TABLE Cars (
  id    INT IDENTITY PRIMARY KEY,
  name  VARCHAR(50),
  price REAL,
  color VARCHAR(15)
);

INSERT INTO Cars (name, price, color)
VALUES
  ('Mercedes SL', 123400, '#674EA7'),
  ('BMW M6 Coupé', 125000, '#0000FF'),
  ('Audi R8', 136100, '#FF0000');
```

## Alterando a classe DAO

Aos poucos, vamos converter a classe DAO para acessar banco de dados, primeiramente, vamos desabilitar todos os métodos
lançando uma exceção que indica que o código não está pronto:

{: data-caption="CarDao.java" data-hi="1,4-5,7,10,14,18,22,26" }
```
@Repository
public class CarDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    private static final RowMapper<Car> ROW_MAPPER = BeanPropertyRowMapper.newInstance(Car.class);

    public void add(Car car) {
        throw new UnsupportedOperationException();
    }

    public Car get(long id) {
        throw new UnsupportedOperationException();
    }

    public void edit(Car car) {
        throw new UnsupportedOperationException();
    }

    public void delete(long id) {
        throw new UnsupportedOperationException();
    }

    public List<Car> findAll() {
        throw new UnsupportedOperationException();
    }

}
```

### Listando todos os carros

{: data-caption="CarDao.java" data-hi="6-9" }
```
    public void delete(long id) {
        throw new UnsupportedOperationException();
    }

    public List<Car> findAll() {
        String sql = "SELECT * FROM Cars";
        List<Car> cars = jdbcTemplate.query(sql, ROW_MAPPER);

        return cars;
    }

}
```

### Obtendo um carro

{: data-caption="CarDao.java" data-hi="14-17" }
```
@Repository
public class CarDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final RowMapper<Car> ROW_MAPPER = BeanPropertyRowMapper.newInstance(Car.class);

    public void add(Car car) {
        throw new UnsupportedOperationException();
    }

    public Car get(long id) {
        String sql = "SELECT * FROM Cars WHERE id=?";
        Car car = jdbcTemplate.queryForObject(sql, ROW_MAPPER, id);

        return car;
    }

```

### Excluindo um carro

{: data-caption="CarDao.java" data-hi="6-11" }
```
    public void edit(Car car) {
        throw new UnsupportedOperationException();
    }

    public void delete(long id) {
        String sql = "DELETE FROM Cars WHERE id=?";
        int rows = jdbcTemplate.update(sql, id);

        if (rows == 0) {
            throw new IllegalArgumentException("Carro não encontrado: " + id);
        }
    }

    public List<Car> findAll() {
```

### Editando um carro

{: data-caption="CarDao.java" data-hi="9-14" }
```
    public Car get(long id) {
        String sql = "SELECT * FROM Cars WHERE id=?";
        Car car = jdbcTemplate.queryForObject(sql, ROW_MAPPER, id);

        return car;
    }

    public void edit(Car car) {
        String sql = "UPDATE Cars SET name=?, price=?, color=? WHERE id=?";
        int rows = jdbcTemplate.update(sql, car.getName(), car.getPrice(), car.getColor(), car.getId());

        if (rows == 0) {
            throw new IllegalArgumentException("Carro não encontrado: " + car.getId());
        }
    }

    public void delete(long id) {
```

### Adicionando um carro

{: data-caption="CarDao.java" data-hi="10-11" }
```
@Repository
public class CarDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final RowMapper<Car> ROW_MAPPER = BeanPropertyRowMapper.newInstance(Car.class);

    public void add(Car car) {
        String sql = "INSERT INTO Cars (name, price, color) values (?, ?, ?);";
        jdbcTemplate.update(sql, car.getName(), car.getPrice(), car.getColor());
    }

    public Car get(long id) {
```

## Testando o projeto

Adicione linhas à tabela com o _SQL Server Management Studio_ e veja os dados aparecerem na aplicação e, faça o
contrário, utilize as funções de cadastro, alteração ou exclusão de carro e veja o banco ser modificado.

### Refletindo sobre MVC

Como a aplicação foi desenvolvida utilizando as melhores práticas, fizemos a alteração na camada _Model_, tornando os
dados dos carros persistentes sem precisar alterar nada nas camadas _View_ e _Controller_.
