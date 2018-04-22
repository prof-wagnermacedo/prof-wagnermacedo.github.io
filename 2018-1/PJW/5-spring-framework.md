---
topic: Introdução ao Spring Framework
layout: course
date: 2018-04-16 19:00
part: 2
---

* TOC
{:toc .no-h3" data-caption="(em construção)"}

## Preparação

### Novo projeto de aplicação web

1. Crie um novo projeto de <u>Aplicação Web</u> pelo NetBeans.
2. Nome do projeto: "<u>SpringWebApp</u>"
3. Servidor: GlassFish
4. Frameworks: escolha _Spring Web MVC_, na configuração, escolha a versão 4.0.1 e deixe marcada a opção _Incluir JSTL_.
5. Clique em Finalizar

### Exclusão de arquivos desnecessários

Na área de _Páginas Web_, remova todos os arquivos **.jsp** e **.xml** criados pelo NetBeans (não vamos precisar deles).
Só deixe as pastas `WEB-INF/` e `WEB-INF/jsp/`.

### Adicionar biblioteca necessária

Clique o botão direito do mouse em **Bibliotecas** e selecione no menu de contexto a opção _Adicionar Biblioteca_,
escolha **Hibernate 4.3.x**.

## Anotações Java

O framework Spring trabalha com anotações para fazer as automatizações, eliminando muito código repetido.
Uma anotação em Java é uma instrução do tipo `@Anotacao` inserida antes da definição de uma classe, de um método,
de um atributo ou de um parâmetros de método.

Por exemplo, na programação web em Java tradicional, usamos a anotação `@WebServlet` para indicar para o servidor
GlassFish que a classe é um servlet.

## Criando um Hello World

Primeiro, vamos criar uma classe `HelloController` no pacote `primavera.controller` com um ponto de entrada em `/hi`.
Observe as anotações colocadas.

{: data-caption="HelloController.java (novo)"}
```
package primavera.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HelloController {
    @RequestMapping("/hi")
    @ResponseBody
    public String hi() {
        return "Hello, world.";
    }
}
```

Essas anotações não tem efeito se não configurarmos o Spring, para isso vamos criar duas classes `AppConfig` e
`ServletInitializer` dentro do pacote `primavera.config`.

{: data-caption="AppConfig.java (novo)"}
```
package primavera.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"primavera.controller"})
public class AppConfig {

}
```

{: data-caption="ServletInitializer.java (novo)"}
```
package primavera.config;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

public class ServletInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class<?>[0];
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class<?>[]{AppConfig.class};
    }

    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }
}
```

Depois que criar as configurações, execute o projeto e acesse <http://localhost:8080/SpringWebApp/hi> para ver se está
funcionando, a resposta deve ser a que foi configurada no controller.

Observe que `"/hi"` após o contexto da aplicação é o nome utilizado na anotação `@RequestMapping`.

## Criando uma listagem de carros

Vamos adicionar um controller mais complexo que vai envolver as outras camadas do padrão MVC: por enquanto só usamos o
**C** _(controller)_, agora vamos utilizar também o **M** _(model)_ e o **V** _(view)_.

### A camada Model

Esta é a camada responsável pelos dados da aplicação. Criaremos dois elementos:

- A classe `Car`, que serve apenas para encapsular os campos de um carro.
- A classe `CarDao`, que utiliza-se do padrão DAO _(Data Access Object)_ para dar acesso aos dados.

Normalmente uma classe DAO faz acesso a um banco de dados, mas nesse exemplo, por enquanto, nosso "banco de dados" será
uma lista normal, guardada na memória temporária do servidor.

---

Primeiro, crie a classe `Car` no pacote `primavera.domain`.

{: data-caption="Car.java (novo)"}
```
package primavera.domain;

import java.math.BigDecimal;

public class Car {
    private String name;
    private BigDecimal price;

    // getters & setters
}
```

Depois, crie a classe `CarDao` no pacote `primavera.dao`. Observe que temos a anotação `@Service`, ela serve para não
precisarmos instanciar essa classe nós mesmos quando a utilizarmos.

{: data-caption="CarDao.java (novo)"}
```
package primavera.dao;

import org.springframework.stereotype.Service;
import primavera.domain.Car;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class CarDao {
    private final List<Car> carList = new ArrayList<>();

    CarDao() {
        Car car1 = new Car();
        car1.setName("Mercedes SL");
        car1.setPrice(BigDecimal.valueOf(123400));
        carList.add(car1);

        Car car2 = new Car();
        car2.setName("BMW M6 Coupé");
        car2.setPrice(BigDecimal.valueOf(125000));
        carList.add(car2);

        Car car3 = new Car();
        car3.setName("Audi R8");
        car3.setPrice(BigDecimal.valueOf(136100));
        carList.add(car3);
    }

    public List<Car> findAll() {
        return carList;
    }
}
```

### A camada View

Esta é a camada responsável pelo que o usuário vê. Normalmente, usamos arquivos **.jsp** para implementar a _view_.
Assim, na área de Páginas Web, criaremos o arquivo `list.jsp` dentro da pasta `WEB-INF/jsp/car/`.

{: data-caption="WEB-INF/jsp/car/list.jsp (novo)"}
```
<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Carros</title>
    </head>
    <body>
        <h1>Carros</h1>
        <c:forEach items="${carList}" var="car">
            <p>
                ${car.name}: $${car.price}
            </p>
        </c:forEach>
    </body>
</html>
```

### A camada Controller

Para fazer a ligação entre as camadas _Model_ e _View_, temos a camada _**Controller**_. Aqui, vamos criar uma nova classe
`CarController`. Observe a anotação `@Autowired`, com ela não precisamos instanciar manualmente o atributo.

Tem outra coisa importante para observar: no método `carList(Model)` utilizamos um objeto `model` para adicionar um
atributo chamado `"carList"`, esse é utilizado pela _view_ com `${carList}`.

{: data-caption="CarController.java (novo)"}
```
package primavera.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import primavera.dao.CarDao;
import primavera.domain.Car;

import java.util.List;

@Controller
public class CarController {
    @Autowired
    private CarDao carDao;

    @RequestMapping("/car/list")
    public void carList(Model model) {
        List<Car> carList = carDao.findAll();
        model.addAttribute("carList", carList);
    }
}
```

### Configurações pendentes

#### O arquivo JSP ainda não pode ser encontrado

No _controller_, definimos o caminho `"/car/list"`, esse também é o caminho usado para carregar a _view_
em <code class="nowrap">WEB-INF/jsp<b>/car/list</b>.jsp</code>, mas para isso ocorrer, precisamos antes
adicionar uma configuração à `AppConfig` para o Spring saber onde encontrar as _views_:

{: data-caption="AppConfig.java" data-hi="6-13"}
```
@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"primavera.controller"})
public class AppConfig {

    @Bean
    public ViewResolver jspViewResolver() {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setViewClass(JstlView.class);
        resolver.setPrefix("/WEB-INF/jsp/");
        resolver.setSuffix(".jsp");
        return resolver;
    }

}
```

#### A classe DAO não foi inicializada

Para que o Spring processe a anotação `@Service` na classe DAO, é preciso informar na configuração para que o pacote
`primavera.dao` também seja escaneado:

<div data-caption="AppConfig.java" data-hi="1" class="highlighter-rouge">
<pre class="highlight"><code>
@ComponentScan(basePackages = {<b>"primavera.dao"</b>, "primavera.controller"})
</code></pre>
</div>

### O código até agora

Você pode baixar o código até esse ponto [aqui][car-list].

[car-list]: https://github.com/prof-wagnermacedo/SpringWebApp/archive/629d1d1dbb9ce060414da8e3b944d80277eceb30.zip

## Funcionalidade de adicionar carros

Vamos adicionar a possibilidade de adicionar carros à listagem. Precisamos de três coisas:

1. Criar um método `add(Car)` na classe `CarDao`.
2. Criar dois métodos `carAdd()` e `carAdd(Car)` à classe `CarController`.
3. Adicionar um formulário HTML em `WEB-INF/jsp/car/add.jsp`.

### Alterando o DAO

{: data-caption="CarDao.java" data-hi="7-9"}
```
        Car car3 = new Car();
        car3.setName("Audi R8");
        car3.setPrice(BigDecimal.valueOf(136100));
        carList.add(car3);
    }

    public void add(Car car) {
        carList.add(car);
    }

    public List<Car> findAll() {
        return carList;
    }
}
```

### Alterando o controller

Precisamos de dois métodos no _controller_ configurados para o mesmo caminho `/car/add`, um deles irá apenas carregar o
arquivo JSP utilizando o método HTTP GET, e o outro irá fazer o cadastro, mas aceitará apenas requisições HTTP POST.

Observe a nova anotação `@ModelAttribute`, com a utilização dela, não precisamos obter os parâmetros do formulário
manualmente, como fazíamos utilizando servlets.

Isto quer dizer que o objeto do tipo `Car` no segundo método já virá preenchido.

{: data-caption="CarController.java" data-hi="7-15"}
```
    @RequestMapping("/car/list")
    public void carList(Model model) {
        List<Car> carList = carDao.findAll();
        model.addAttribute("carList", carList);
    }

    @RequestMapping("/car/add")
    public void carAdd() {
    }

    @RequestMapping(value = "/car/add", method = RequestMethod.POST)
    public String carAdd(@ModelAttribute Car car) {
        carDao.add(car);
        return "redirect:/car/list";
    }

}
```

### Adicionando o formulário de cadastro

{: data-caption="WEB-INF/jsp/car/add.jsp (novo)"}
```
<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Carros</title>
    </head>
    <body>
        <h1>Adicione um carro</h1>

        <form:form method="POST">
            <p>
                Nome: <br>
                <input type="text" name="name" />
            </p>
            <p>
                Preço: <br>
                <input type="number" name="price" />
            </p>

            <input type="submit" />
        </form:form>
    </body>
</html>
```

### O código até agora

Você pode baixar o código até esse ponto [aqui][car-add].

[car-add]: https://github.com/prof-wagnermacedo/SpringWebApp/archive/39770a9dded9547d09789ea77d7f53bbd887ac90.zip

## Validação do formulário

O framework Spring fornece uma forma conveniente para validar formulários.

### Anotando a classe da entidade

Primeiro, vamos adicionar à classe `Car` anotações que explicam os requisitos para cada campo:

{: data-caption="Car.java" data-hi="2,5"}
```
public class Car {
    @NotEmpty
    private String name;

    @Min(1000) @Max(5_000_000)
    private BigDecimal price;

}
```

As anotações dizem que `name` não pode estar vazio e `price` deve estar entre mil e cinco milhões.

### Alterando o controller para garantir a entrada válida

Precisamos adicionar outra anotação ao argumento do tipo `Car` e adicionar um segundo argumento do tipo `BindingResult`,
para saber o resultado da validação, utilizamos esse objeto para mandar retornar ao formulário, informando ao usuário
dos erros ocorridos.

{: data-caption="CarController.java" data-hi="5-12"}
```
    @RequestMapping("/car/add")
    public void carAdd() {
    }

    @RequestMapping(value = "/car/add", method = RequestMethod.POST)
    public String carAdd(@ModelAttribute("car") @Valid Car car, BindingResult result) {
        if (result.hasErrors()) {
            // mostra o formulário novamente, com os erros
            return "/car/add";
        }

        // validação bem sucedida
        carDao.add(car);
        return "redirect:/car/list";
    }

}
```

### Alterando o formulário para exibir os erros

{: data-caption="WEB-INF/jsp/car/add.jsp" data-hi="9-11,16,20,25"}
```
<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Carros</title>
        <style>
            .error { color: red; }
        </style>
    </head>
    <body>
        <h1>Adicione um carro</h1>

        <form:form method="POST" modelAttribute="car">
            <p>
                Nome: <br>
                <input type="text" name="name" />
                <form:errors path="name" cssClass="error" />
            </p>
            <p>
                Preço: <br>
                <input type="number" name="price" />
                <form:errors path="price" cssClass="error" />
            </p>

            <input type="submit" />
        </form:form>
    </body>
</html>
```

### Mantendo o formulário preenchido nos erros

Para isso, usamos as tags do Spring `<form:input>` em vez dos `<input>` convencionais do HTML:

{: data-caption="WEB-INF/jsp/car/add.jsp" data-hi="6,11"}
```
        <h1>Adicione um carro</h1>

        <form:form method="POST" modelAttribute="car">
            <p>
                Nome: <br>
                <form:input path="name" />
                <form:errors path="name" cssClass="error" />
            </p>
            <p>
                Preço: <br>
                <form:input path="price" type="number" />
                <form:errors path="price" cssClass="error" />
            </p>

            <input type="submit" />
        </form:form>
    </body>
</html>
```

É preciso também uma pequena alteração no controller para não haver erros de execução:

{: data-caption="CarController.java" data-hi="8"}
```
    @RequestMapping("/car/list")
    public void carList(Model model) {
        List<Car> carList = carDao.findAll();
        model.addAttribute("carList", carList);
    }

    @RequestMapping("/car/add")
    public void carAdd(@ModelAttribute("car") Car car) {
    }

    @RequestMapping(value = "/car/add", method = RequestMethod.POST)
    public String carAdd(@ModelAttribute("car") @Valid Car car, BindingResult result) {
        if (result.hasErrors()) {
            // mostra o formulário novamente, com os erros
            return "/car/add";
```

### O código até agora

Você pode baixar o código até esse ponto [aqui][car-validation].

[car-validation]: https://github.com/prof-wagnermacedo/SpringWebApp/archive/51e1bc01fa4a3983f381991598a1392bfb8be250.zip

{% include warning-mode.html %}
{% if jekyll.environment != 'production' %}

## [GIT] Adiciona um id à entidade Car

{: data-caption="Car.java" data-hi="2"}
```
public class Car {
    private Long id;

    @NotEmpty
    private String name;

    @Min(1000) @Max(5_000_000)
    private BigDecimal price;

    // getters & setters
```

{: data-caption="CarDao.java" data-hi="4,24,25"}
```
@Service
public class CarDao {
    private final List<Car> carList = new ArrayList<>();
    private static long sequence = 0;

    CarDao() {
        Car car1 = new Car();
        car1.setName("Mercedes SL");
        car1.setPrice(BigDecimal.valueOf(123400));
        this.add(car1);

        Car car2 = new Car();
        car2.setName("BMW M6 Coupé");
        car2.setPrice(BigDecimal.valueOf(125000));
        this.add(car2);

        Car car3 = new Car();
        car3.setName("Audi R8");
        car3.setPrice(BigDecimal.valueOf(136100));
        this.add(car3);
    }

    public void add(Car car) {
        sequence += 1;
        car.setId(sequence);
        carList.add(car);
    }

    public List<Car> findAll() {
        return carList;
    }
}
```

## [GIT] Adiciona interface para editar um carro

{: data-caption="CarDao.java" data-hi="7-15"}
```
    public void add(Car car) {
        sequence += 1;
        car.setId(sequence);
        carList.add(car);
    }

    public Car get(long id) {
        for (Car car : carList) {
            if (id == car.getId()) {
                return car;
            }
        }

        throw new IllegalArgumentException("Carro não encontrado: " + id);
    }

    public List<Car> findAll() {
        return carList;
    }
}
```

{: data-caption="CarController.java" data-hi="13-19"}
```
    @RequestMapping(value = "/car/add", method = RequestMethod.POST)
    public String carAdd(@ModelAttribute("car") @Valid Car car, BindingResult result) {
        if (result.hasErrors()) {
            // mostra o formulário novamente, com os erros
            return "/car/add";
        }

        // validação bem sucedida
        carDao.add(car);
        return "redirect:/car/list";
    }

    @RequestMapping("/car/edit/{id}")
    public String carEdit(@PathVariable("id") Long id, Model model) {
        Car car = carDao.get(id);
        model.addAttribute("car", car);

        return "/car/add";
    }
}
```

{: data-caption="WEB-INF/jsp/car/add.jsp" data-hi="2,5"}
```
    <body>
        <h1>${car.id == null ? 'Adicione' : 'Edite'} um carro</h1>

        <form:form method="POST" modelAttribute="car">
            <form:hidden path="id" />
            <p>
                Nome: <br>
                <form:input path="name" />
                <form:errors path="name" cssClass="error" />
            </p>
```

## [GIT] Link para editar os itens da lista de carros

{: data-caption="WEB-INF/jsp/car/list.jsp" data-hi="5,6"}
```
    <body>
        <h1>Carros</h1>
        <c:forEach items="${carList}" var="car">
            <p>
                <c:url var="editUrl" value="/car/edit/${car.id}" />
                ${car.name}: $${car.price} <a href="${editUrl}">Editar</a>
            </p>
        </c:forEach>
    </body>
</html>
```

## [GIT] Adiciona funcionalidade de editar carros

{: data-caption="CarDao.java" data-hi="11-20"}
```
    public Car get(long id) {
        for (Car car : carList) {
            if (id == car.getId()) {
                return car;
            }
        }

        throw new IllegalArgumentException("Carro não encontrado: " + id);
    }

    public void edit(Car car) {
        for (int i = 0; i < carList.size(); i++) {
            if (car.getId() == carList.get(i).getId()) {
                carList.set(i, car);
                return;
            }
        }

        throw new IllegalArgumentException("Carro não encontrado: " + car.getId());
    }

    public List<Car> findAll() {
        return carList;
    }
}
```

{: data-caption="CarController.java" data-hi="9-19"}
```
    @RequestMapping("/car/edit/{id}")
    public String carEdit(@PathVariable("id") Long id, Model model) {
        Car car = carDao.get(id);
        model.addAttribute("car", car);

        return "/car/add";
    }

    @RequestMapping(value = "/car/edit/{id}", method = RequestMethod.POST)
    public String carEdit(@ModelAttribute("car") @Valid Car car, BindingResult result) {
        if (result.hasErrors()) {
            // mostra o formulário novamente, com os erros
            return "/car/add";
        }

        // validação bem sucedida
        carDao.edit(car);
        return "redirect:/car/list";
    }
}
```

## [GIT] Prefixo comum para rotas do controller

{: data-caption="CarController.java" data-hi="2,7,13,17,29,37"}
```
@Controller
@RequestMapping("/car")
public class CarController {
    @Autowired
    private CarDao carDao;

    @RequestMapping("/list")
    public void carList(Model model) {
        List<Car> carList = carDao.findAll();
        model.addAttribute("carList", carList);
    }

    @RequestMapping("/add")
    public void carAdd(@ModelAttribute("car") Car car) {
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public String carAdd(@ModelAttribute("car") @Valid Car car, BindingResult result) {
        if (result.hasErrors()) {
            // mostra o formulário novamente, com os erros
            return "/car/add";
        }

        // validação bem sucedida
        carDao.add(car);
        return "redirect:/car/list";
    }

    @RequestMapping("/edit/{id}")
    public String carEdit(@PathVariable("id") Long id, Model model) {
        Car car = carDao.get(id);
        model.addAttribute("car", car);

        return "/car/add";
    }

    @RequestMapping(value = "/edit/{id}", method = RequestMethod.POST)
    public String carEdit(@ModelAttribute("car") @Valid Car car, BindingResult result) {
        if (result.hasErrors()) {
            // mostra o formulário novamente, com os erros
            return "/car/add";
        }

        // validação bem sucedida
        carDao.edit(car);
        return "redirect:/car/list";
    }
}
```

## [GIT] Cria uma página inicial

{: data-caption="WEB-INF/jsp/index.jsp (novo)"}
```
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Bem vindo</title>
    </head>
    <body>
        <h1>Bem vindo</h1>
        <p>Uma magnífica página inicial, não é?</p>
    </body>
</html>
```

{: data-caption="HomeController.java (novo)"}
```
package primavera.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
    @RequestMapping("/")
    public String home() {
        return "index";
    }
}
```

## [GIT] Fazendo páginas multi-idiomas

{: data-caption="WEB-INF/jsp/index.jsp" data-hi="2,8,11,12"}
```
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title><spring:message code="home.title"/></title>
    </head>
    <body>
        <h1><spring:message code="home.title"/></h1>
        <p><spring:message code="home.intro"/></p>
    </body>
</html>
```

{: data-caption="messages_pt.properties (novo)"}
```
home.title=Bem vindo
home.intro=Uma magn\u00edfica p\u00e1gina inicial, concorda?
```

{: data-caption="messages_en.properties (novo)"}
```
home.title=Welcome
home.intro=This is a magnificent home page, isn't it?
```

{: data-caption="AppConfig.java" data-hi="15-22"}
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

}
```

## [GIT] Define idioma padrão

{: data-caption="AppConfig.java" data-hi="10-15"}
```
    @Bean
    public MessageSource messageSource() {
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
        messageSource.setBasename("classpath:/messages");
        messageSource.setDefaultEncoding("UTF-8");
        messageSource.setUseCodeAsDefaultMessage(true);
        return messageSource;
    }

    @Bean
    public LocaleResolver localeResolver() {
        CookieLocaleResolver localeResolver = new CookieLocaleResolver();
        localeResolver.setDefaultLocale(Locale.forLanguageTag("en"));
        return localeResolver;
    }

}
```

{% endif %}
