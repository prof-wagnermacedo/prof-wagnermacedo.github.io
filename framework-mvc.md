---
description: Programação em Java para Web
layout: course
---

# Mini framework MVC

O framework é baseado em duas classes: `FrontController` e `Command`.

![](assets/images/mvc/front-controller.svg)

## Funcionamento básico

O seguinte diagrama de sequência mostra o funcionamento, sendo que o comando
solicitado é `Home` que possui um método chamado `sobre()`.

![](assets/images/mvc/front-controller-sequence.svg){: width="500px"}

## Definições das classes

{: data-caption="FrontController.java" }
```java
{% include_relative assets/examples/FrontController.java %}
```

{: data-caption="Command.java" }
```java
{% include_relative assets/examples/Command.java %}
```
