---
layout: course
quiz-number: 99
quiz-title: Recuperação
date: 2099-09-09

hidden: true
---

# {{ page.quiz-title }}

_Essa questão de recuperação vale 5,0 e substitui a pontuação da questão 3 da 1ª Avaliação._

{: .pergunta}
Você irá criar um registro simples de itens utilizando o recurso de cookies.

{: .pergunta}
Na página, inicialmente, deverá aparecer o seguinte formulário:

<div class="exemplo">
Registrar item: <input readonly type="text"> <input type="submit">
</div>

{: .pergunta}
Após o usuário enviar itens, abaixo do formulário deverá aparecer uma lista com todos os itens enviados.

---

{: .pergunta}
Veja uma possível sequência de eventos:

<div class="exemplo-out" data-caption="1º: Primeiro acesso">
<div class="exemplo">
Registrar item: <input readonly type="text" value="Violao"> <input type="submit">
</div>
</div>

<div class="exemplo-out" data-caption="2º: Após enviar 'Violao'">
<div class="exemplo">
Registrar item: <input readonly type="text" value="Guitarra"> <input type="submit">
<hr>
<ul>
  <li>Violao</li>
</ul>
</div>
</div>

<div class="exemplo-out" data-caption="3º: Após enviar 'Guitarra'">
<div class="exemplo">
Registrar item: <input readonly type="text" value="Bateria"> <input type="submit">
<hr>
<ul>
  <li>Violao</li>
  <li>Guitarra</li>
</ul>
</div>
</div>

<div class="exemplo-out" data-caption="4º: Após enviar 'Bateria'">
<div class="exemplo">
Registrar item: <input readonly type="text"> <input type="submit">
<hr>
<ul>
  <li>Violao</li>
  <li>Guitarra</li>
  <li>Bateria</li>
</ul>
</div>
</div>

{: .pergunta}
E assim em diante!

**ATENÇÃO:** lembre-se que essa é uma lista gravada em cookie, você não pode usar atributo do lado servidor para esse fim.
