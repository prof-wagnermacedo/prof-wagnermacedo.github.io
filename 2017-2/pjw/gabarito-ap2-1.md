---
layout: course
exam-title: Atividade Pontuada 2 (2ª chamada)
date: 2017-09-18 00:00

hidden: true
---

# {{ page.exam-title }}

{: .pergunta}
1\. Qual dos trechos de código a seguir faz com que um servlet encaminhe a requisição para `form.jsp` de forma que
    NÃO seja modificada a URL no lado cliente?

<table class="opcoes">
<tr><td>a. ◯</td>
<td markdown="1">
```
request.setAttribute("forward", "form.jsp");
```
</td></tr>
<tr><td>b. ◯</td>
<td markdown="1">
```
String pagina = request.getParameter("form.jsp");
request.setAttribute(pagina, "forward");
```
</td></tr>
<tr><td>c. ⬤</td>
<td markdown="1">
```
RequestDispatcher rd = request.getRequestDispatcher("form.jsp");
rd.forward(request, response);
```
</td></tr>
<tr><td>d. ◯</td>
<td markdown="1">
```
response.sendRedirect("form.jsp");
```
</td></tr>
<tr><td>e. ◯</td>
<td markdown="1">
Nenhum dos anteriores
</td></tr>
</table>

{: .pergunta}
2\. Observe o servlet a seguir e responda.

```java
public class AtividadeServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response) throws IOException {
        String[] params = request.getParameterValues("arg");

        int x = 0;
        for (String s : params) {
            int y = Integer.parseInt(s);
            if (y > x)
                x = y;
        }
        
        response.getWriter().println(x);
    }
}
```

{: .pergunta}
Qual o objetivo do servlet `AtividadeServlet`?

{: .opcoes}
| a. ◯ | Verificar se existe um `x` que seja equivalente a um `y`. |
| b. ◯ | Identificar um parâmetro compatível com a resposta.       |
| c. ◯ | Verificar se todos os parâmetros passados são numéricos.  |
| d. ⬤ | Calcular o maior dos números passados por parâmetro.      |
| e. ◯ | Nenhum dos anteriores                                     |

{: .pergunta}
3\. Observe o servlet abaixo e responda.

```java
public class AtividadeServlet2 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response) throws IOException {
        Cookie ckDoce = null;

        Cookie[] cookies = request.getCookies();
        for (Cookie ck : cookies) {
            if (ck.getName().equals("doce")) {
                ckDoce = ck;
                break;
            }
        }

        if (ckDoce == null) {
            ckDoce = new Cookie("doce", "0.25");
        } else {
            double peso = Double.parseDouble(ckDoce.getValue());
            if (peso > 0.5) {
                peso = peso - 0.5;
            }

            ckDoce.setValue(String.valueOf(peso));
        }

        response.addCookie(ckDoce);
        response.getWriter().println("Peso: " + ckDoce.getValue());
    }
}
```

{: .pergunta}
Considerando que um usuário inicia um browser limpo, sem cookies, qual será a resposta recebida na primeira
requisição ao servlet `AtividadeServlet2`?

{: .pergunta}
E qual será a resposta à segunda requisição?
