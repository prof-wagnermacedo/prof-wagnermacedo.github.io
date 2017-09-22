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

{: .pergunta}
2\. Adapte o comando da questão anterior para que exiba a frase através de um arquivo JSP usando o método
`forward()` da classe `Command`.

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
