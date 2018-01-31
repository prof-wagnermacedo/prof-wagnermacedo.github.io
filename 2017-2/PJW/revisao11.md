---
layout: course
quiz-number: 3.5
quiz-title: Revisão 1.1
date: 2017-09-07
---

# {{ page.quiz-title }}

Esta é uma revisão para a primeira prova.

{: .pergunta}
1\. Podemos identificar o idioma requisitado usando o seguinte trecho de código Java:

```java
// Obtém a informação completa de local
Locale locale = request.getLocale();

// Obtém um código de idioma
String idioma = locale.getLanguage();
```

{: .pergunta}
Se estiver em um arquivo JSP, você pode fazer o mesmo da seguinte forma:

```smarty
<!-- Obtém a informação completa de local -->
<c:set var="locale" value="${pageContext.request.locale}"/>

<!-- Obtém um código de idioma -->
<c:set var="idioma" value="${locale.language}"/>
```

{: .pergunta}
<div markdown="1">

Em qualquer um dos casos, a variável `idioma` receberá um código de idioma definido pelo
padrão [ISO 639-1][iso639-1], por exemplo:

- `pt`: Português
- `en`: Inglês
- `es`: Espanhol
- `fr`: Francês

A sua tarefa será criar um servlet ou JSP que identifique o idioma requisitado. Caso seja _português_, redirecione
para <https://pt.wikipedia.org/>, caso seja _inglês_, redirecione para <https://en.wikipedia.org/> e
caso seja _espanhol_, redirecione para <https://es.wikipedia.org/>.

[iso639-1]: https://pt.wikipedia.org/wiki/ISO_639#C.C3.B3digo_dos_l.C3.ADnguas_conforme_ISO_639
{: target="_blank"}

</div>

**OBS:** para redirecionar usando JSP, a instrução de redirecionamento deverá
vir antes de qualquer conteúdo, ou seja, no início do arquivo.

{: .resposta}
<div markdown="1">

O código para esse servlet é bem direto, conforme você pode ver abaixo:

<script src="https://gist.github.com/wagnerluis1982/86eee3622e594a8b510be606391e9a9f.js"></script>

E assim como foi dito no enunciado, também é possível o mesmo efeito com um JSP.

Segue abaixo uma **resposta alternativa**, usando apenas JSP:

<script src="https://gist.github.com/wagnerluis1982/55e9ce8a32c3ed638d5e6d641fcbe15b.js"></script>

</div>


{: .pergunta}
2\. Para esta questão, considere o formulário a seguir:

```html
<form method="post">
    Do que você mais gosta? <br>
    <input type="radio" name="gosto" value="cinema"> Cinema <br>
    <input type="radio" name="gosto" value="livros"> Livros <br>
    <input type="radio" name="gosto" value="musica"> Música <br>
    <br>
    <input type="submit">
</form>
```

<div class="pergunta" markdown="1">

Utilizando esse formulário, crie um servlet para gravar em um cookie a opção marcada anteriormente,
de forma que esse formulário acessado novamente pelo mesmo browser apareça com essa opção previamente
marcada.

Note que o formulário envia por método POST, assim a gravação do cookies deve acontecer no método
`doPost()` enquanto o método `doGet()` será usado para exibir o formulário.

Para que uma opção apareça pré-marcada, adicione o atributo `checked` à tag `<input>`:

```html
<input type="radio" name="gosto" value="cinema" checked>
```

</div>

**Dica:** utilize `RequestDispatcher` para exibir o formulário de um arquivo JSP.

{: .resposta}
<div markdown="1">

Segue a resposta com o arquivo JSP e a classe Java:

<script src="https://gist.github.com/wagnerluis1982/88deb890d5bc66ee1dd18039a180baf4.js"></script>

</div>
