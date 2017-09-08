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
A resposta estará disponível em breve, tente fazer primeiro.
