---
layout: course
quiz-number: 3.5
quiz-title: Revisão 1.0
date: 2017-09-05
---

# {{ page.quiz-title }}

Esta é uma revisão para a primeira prova.

{: .pergunta}
1\. Para esta questão, considere o servlet abaixo:

```java
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Q1Servlet extends HttpServlet {
   /**
    * Esse método é chamado uma vez, apenas quando o servlet é iniciado.
    *
    * Aqui, eu defini um atributo "lista", no escopo da aplicação (contexto)
    * sendo o valor um objeto do tipo List vazio.
    */
   public void init() {
       List<String> lista = new ArrayList<>();
       getServletContext().setAttribute("lista", lista);
   }

   protected void doGet(HttpServletRequest request,
                        HttpServletResponse response) throws ServletException, IOException {
       RequestDispatcher rd = request.getRequestDispatcher("/q1-form.jsp");
       rd.forward(request, response);
   }

   protected void doPost(HttpServletRequest request,
                         HttpServletResponse response) throws ServletException, IOException {
       @SuppressWarnings("unchecked")
       // Obtém a lista de strings do escopo da aplicação
       List<String> lista = (List<String>) getServletContext().getAttribute("lista");

       //
       // A partir daqui, é com você...
       //
   }
}
```

{: .pergunta}
<div markdown="1">

Esse servlet encaminha as requisições GET para a página `/q1-form.jsp` e processa as requisições POST
vindo de um formulário contido na página.

A página `/q1-form.jsp` contém um formulário configurado para enviar por método POST e com apenas um
campo de texto chamado "item" e uma tabela listando todos os itens obtidos com a variável `${lista}`.

A tarefa será criar o arquivo JSP com as especificações acima e completar o método `doPost()` do servlet
para processar o parâmetro "item", adicionando-o à lista. Considere que o parâmetro "item" pode não existir
ou vir vazio, nesses casos, você não deve adicioná-lo à lista.

</div>

**OBS:** para adicionar um valor à lista, no servlet, use `lista.add(valor)`. 

{: .resposta}
<div markdown="1">

Abaixo, você verá dois arquivos:

`q1-form.jsp`
: Parte importante para o lado cliente: o formulário HTML e a lista de itens.

`Q1Servlet.java`
: Parte do lado servidor:
  - implementado o que faltou no método `doPost()`
  - mapeado o servlet para `/questao1`

: Veja que a implementação é bem simples, basicamente um `if` e a instrução para adicionar o item à lista,
  os outros códigos servem para facilitar o teste.

<script src="https://gist.github.com/wagnerluis1982/4ac488646e3c64c06bf5366cb8e6e010.js"></script>

</div>

{: .pergunta}
2\. Crie um servlet e um JSP que trabalhem junto através do uso de `RequestDispatcher`.

{: .pergunta}
Quando o usuário acessar a página, deverá ver um formulário conforme exemplo abaixo.

{: .exemplo}
Busca: <input type="text" readonly> <input type="submit">

{: .pergunta}
A tarefa será fazer que o texto enviado através da caixa de busca seja gravado em um _cookie_
chamado "busca", e quando o usuário acessar a mesma página, o campo de entrada esteja com o
último valor enviado, isto é, com o valor do _cookie_ "busca".

**OBS<sub>1</sub>:** não façam testes na implementação com valores acentuados, pois existe uma limitação nos
cookies HTTP que impedem a sua utilização.

**OBS<sub>2</sub>:** na verdade, existe uma forma de utilizar esses caracteres, mas foge do escopo da questão.

{: .resposta}
<div markdown="1">

Existem diversas combinações diferentes para responder essa questão, eu utilizei a mais simples possível,
fazendo um formulário no arquivo `q2-form.jsp`, que envia por método GET mesmo.

Nesse JSP, note que o campo input com `name="busca"` contém o atributo

`value="${cookie['busca'].value}"`

que é o suficiente para que a caixa de busca apareça preenchido com o valor atual do cookie. 

Para a parte Java, temos o arquivo `Q2Servlet.java` com a implementação do método `doGet()` para
realizar a ação de gravar o cookie caso necessário (se o parâmetro da URL existir) e fazer o
encaminhamento (_forward_) para o arquivo JSP.

---

Segue abaixo o conteúdo dos arquivos `q2-form.jsp` e `Q2Servlet.java`: 

<script src="https://gist.github.com/wagnerluis1982/85288584e7fdcde6832bdcba6445d666.js"></script>

</div>
