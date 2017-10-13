---
layout: course
quiz-number: 5
quiz-title: Prática básica de MVC
date: 2017-09-22
---

# {{ page.quiz-title }}

_As questões a seguir deverão ser feitas utilizando o [framework MVC discutido em sala][framework]._

[framework]: {{ '/framework-mvc' | absolute_url }}

{: .pergunta}
1\. Crie um comando para exibir a frase "Hello World", quando o usuário acessar.

<div class="resposta" markdown="1">

Segue abaixo o comando chamado <u>Exercicio51</u> como uma solução.

O comando estará acessível pela query&nbsp;string `?command=Exercicio51:index`.

```java
package commands;

import minimvc.Command;

public class Exercicio51 extends Command {
    public void index() {
        out.println("Hello World");
    }
}
```

</div>

{: .pergunta}
2\. Adapte o comando da questão anterior para que exiba a frase através de um arquivo JSP usando o método
`forward()` da classe `Command`.

<div class="resposta" markdown="1">

O comando <u>Exercicio52</u> abaixo é uma solução.

Note o uso do método `forward()` para exibir um JSP.

{: data-caption="Exercicio52.java"}
```java
package commands;

import minimvc.Command;

import javax.servlet.ServletException;
import java.io.IOException;

public class Exercicio52 extends Command {
    public void index() throws ServletException, IOException {
        forward("/exercicio5.jsp");
    }
}
```

{: data-caption="exercicio5.jsp (parte relevante)"}
```html
<body>
    <p>Hello World</p>
</body>
```

</div>

{: .pergunta}
3\. Crie um comando para exibir o seguinte formulário quando o usuário acessar por GET:

```html
<form method="post">
  Mensagem: <input name="mensagem" type="text"> <input type="submit">
</form>
```

{: .pergunta}
Quando o usuário enviar a mensagem (veja que usa método POST) ele deverá ver uma página de sucesso em que mostre a
própria mensagem enviada pelo usuário.

**OBS:** deixando mais claro, o acesso por método POST não mostra o formulário, apenas por GET.

<div class="resposta" markdown="1">

O comando <u>Exercicio53</u> abaixo é uma solução que utiliza em conjunto as
páginas `exercicio5-form.jsp` e `exercicio5-sucesso.jsp`.

{: data-caption="Exercicio53.java"}
```java
package commands;

import minimvc.Command;

import javax.servlet.ServletException;
import java.io.IOException;

public class Exercicio53 extends Command {
    public void enviarMensagem() throws ServletException, IOException {
        switch (request.getMethod()) {
            case "GET":
                forward("/exercicio5-form.jsp");
                break;

            case "POST":
                String mensagem = getParameter("mensagem");
                if (mensagem == null || mensagem.isEmpty()) {
                    response.sendError(422, "Nenhuma mensagem enviada");
                } else {
                    setAttribute("mensagem", mensagem);
                    forward("/exercicio5-sucesso.jsp");
                }
                break;
        }
    }
}
```

{: data-caption="exercicio5-form.jsp (parte relevante)"}
```html
<body>
    <h1>Envie uma mensagem</h1>

    <form method="post">
        Mensagem: <input name="mensagem" type="text"> <input type="submit">
    </form>
</body>
```

{: data-caption="exercicio5-sucesso.jsp (parte relevante)"}
```smarty
<body>
    <p><strong>Mensagem enviada com sucesso</strong></p>

    <p>A mensagem "${mensagem}" foi enviada com sucesso!</p>
</body>
```

</div>
