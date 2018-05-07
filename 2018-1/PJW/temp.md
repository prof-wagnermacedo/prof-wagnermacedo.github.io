---
layout: course
part: 2
hidden: true
---

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

### Na configuração do Spring

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

## Crie o banco de dados

```sql
CREATE DATABASE [PJW];
USE [PJW];

CREATE TABLE [Cars]
(
    [id] INT IDENTITY PRIMARY KEY,
    [name] VARCHAR(50),
    [price] REAL,
    [color] VARCHAR(15)
);

INSERT INTO Cars
    ([name], [price], [color])
VALUES
    ('Mercedes SL', 123400, '#674EA7'),
    ('BMW M6 Coupé', 125000, '#0000FF'),
    ('Audi R8', 136100, '#FF0000');
```

## Alterando a classe DAO

### Listando todos os carros

{: data-caption="CarDao.java" data-hi="1,4-5,7,10,14,18,22,26-29" }
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
        String sql = "SELECT * FROM Cars";
        List<Car> cars = jdbcTemplate.query(sql, ROW_MAPPER);

        return cars;
    }

}
```
