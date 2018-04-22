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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
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

{% include warning-mode.html %}
{% if jekyll.environment != 'production' %}

## Funcionalidade de adicionar carros

1. Crie o método `add(Car)` na classe `CarDao`.
2. Crie os métodos `carAdd()` e `carAdd(Car)` à classe `CarController`.
3. Adicione o formulário HTML em `WEB-INF/jsp/car/add.jsp`.

{% endif %}
