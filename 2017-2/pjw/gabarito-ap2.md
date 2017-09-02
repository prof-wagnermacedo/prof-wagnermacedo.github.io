---
layout: course
exam-title: Atividade Pontuada 2
---

# {{ page.exam-title }}

{: .pergunta}
1\. Observe o trecho de um arquivo `web.xml` referente ao mapeamento de servlets para URLs.

```xml
<web-app>
  <servlet>
    <servlet-name>One</servlet-name>
    <servlet-class>foo.DeployTestOne</servlet-class>
  </servlet>
  <servlet-mapping>
    <servlet-name>One</servlet-name>
    <url-pattern>*.do </url-pattern>
  </servlet-mapping>
  
  <servlet>
    <servlet-name>Two</servlet-name>
    <servlet-class>foo.DeployTestTwo</servlet-class>
  </servlet>
  <servlet-mapping>
    <servlet-name>Two</servlet-name>
    <url-pattern>/fooStuff/bar</url-pattern>
  </servlet-mapping>
  
  <servlet>
    <servlet-name>Three</servlet-name>
    <servlet-class>foo.DeployTestThree</servlet-class></servlet>
  <servlet-mapping>
    <servlet-name>Three</servlet-name>
  <url-pattern>/fooStuff/*</url-pattern>
</servlet-mapping>
</web-app>
```

{: .pergunta}
Agora indique no quadro abaixo para qual servlet seria mapeada cada uma das URLS.

{: .pergunta}
Suponha que o container está em **localhost:8080** e o contexto da aplicação seja **/MapTest**.

{: .grade}
|                                                    | One | Two | Three | *404 Not Found* |
| http://localhost:8080/MapTest/blue.do              | ⬤  | ◯   | ◯     | ◯               |
| http://localhost:8080/MapTest/fooStuff/bar         | ◯   | ⬤  | ◯     | ◯               |
| http://localhost:8080/MapTest/fooStuff/bar/blue.do | ◯   | ◯   | ⬤    | ◯               |
| http://localhost:8080/MapTest/fooStuff/blue.do     | ◯   | ◯   | ⬤    | ◯               |
| http://localhost:8080/MapTest/fred/blue.do         | ⬤  | ◯   | ◯     | ◯               |
| http://localhost:8080/MapTest/fooStuff             | ◯   | ◯   | ⬤    | ◯               |
| http://localhost:8080/MapTest/fooStuff/bar/foo.fo  | ◯   | ◯   | ⬤    | ◯               |
| http://localhost:8080/MapTest/fred/blue.fo         | ◯   | ◯   | ◯     | ⬤              |

{: .pergunta}
2\. A chamada abaixo feita dentro do método `doGet()` de um servlet define uma resposta em que o cliente é instruído
    a redirecionar para outra URL.

```java
response.sendRedirect("http://www.google.com/");
```

{: .pergunta}
Qual dos trechos de código a seguir é equivalente à essa chamada.

<table class="opcoes">
<tr><td>a. ◯</td>
<td markdown="1">
```
request.getHeader("Location: http://www.google.com/");
```
</td></tr>
<tr><td>b. ⬤</td>
<td markdown="1">
```
response.setStatus(302);
response.setHeader("Location", "http://www.google.com/");
```
</td></tr>
<tr><td>c. ◯</td>
<td markdown="1">
```
String location = request.getParameter("Location");
if (location.equals("http://www.google.com/")) {
    response.getWriter().println(location);
}
```
</td></tr>
<tr><td>d. ◯</td>
<td markdown="1">
```
response.setHeader("Redirect", "http://www.google.com/");
```
</td></tr>
<tr><td>e. ◯</td>
<td markdown="1">
```
PrintWriter out = response.getWriter();
out.println("Redirecionando para http://www.google.com/");
```
</td></tr>
</table>

{: .pergunta}
3\. Observe a classe de servlet a seguir.

```java
public class AtividadeServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response) throws IOException {
        String paramA = request.getParameter("a");
        String paramB = request.getParameter("b");
        String paramC = request.getParameter("c");

        double a = (paramA == null) ? 0 : Double.parseDouble(paramA);
        double b = (paramB == null) ? 0 : Double.parseDouble(paramB);
        double c = (paramC == null) ? 0 : Double.parseDouble(paramC);

        double delta = Math.pow(b, 2) - 4*a*c;

        response.getWriter().println("Delta: " + delta);
    }
}
```

{: .pergunta}
Agora escreva uma _query string_ que, enviada ao servlet, o fará retornar a resposta `Delta: 12.0`.

<div class="resposta" markdown="1">
O valor da variável delta vem da seguinte fórmula

$$ delta = b^2 - 4 \times a \times c $$

Assim, se \\(b=4\\), \\(a=1\\) e \\(c=1\\),

$$ delta = 4^2 - 4 \times 1 \times 1 = 12 $$

Finalmente, se a seguinte query string for passada, teremos a saída desejada:

```
b=4&a=1&c=1
```

Lembrando que existem diversas outras formas de chegar ao mesmo resultado.
</div>

{: .pergunta}
4\. No servlet abaixo, é identificado o idioma solicitado pelo cliente e criada
    uma mensagem especializada para três idiomas suportados: _inglês_, _português_ e _espanhol_.
    
{: .pergunta}
No entanto, o cliente, embora receba uma resposta de sucesso (200 OK), nunca recebe a mensagem
no corpo da resposta, não importa o idioma solicitado. Identifique a razão desse comportamento
e forneça uma solução.

```java
public class AtividadeServlet2 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response) throws IOException {
        String message = "Hi, little friend, how are you?";

        String acceptLanguage = request.getHeader("Accept-Language");
        switch (acceptLanguage) {
            case "pt":
            case "pt-BR":
                message = "Oi, amiguinho, como vai?";
                break;
            case "es":
                message = "Hola, amiguito, ¿cómo estás?";
                break;
        }
    }
}
```

<div class="resposta" markdown="1">
O problema ocorre porque o servlet em nenhum momento envia o conteúdo através do objeto `response.getWriter()`.

Para solucionar o problema, basta adicionar ao final do método `doGet()` o código:

```
response.getWriter().println(message);
```
</div>

<style>

</style>

<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>
