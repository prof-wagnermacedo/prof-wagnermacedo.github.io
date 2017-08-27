package fanese.web;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collections;
import java.util.Map;
import javax.servlet.http.Cookie;

/**
 * @author wagner
 */
@WebServlet(name = "RequisicaoServlet", urlPatterns = {"/requisicao/*"})
public class RequisicaoServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setStatus(200);
        response.setContentType("text/html; charset=utf-8");

        PrintWriter out = response.getWriter();
        out.println("<html>"      +
                "<head><style>"   +
                "td {white-space:pre; font-family:monospace; padding:1px 0}" +
                "td:last-child::before {content:' == '}" +
                "</style></head>" +
                "<body>");

        out.println("<h1>Informações da Requisição</h1>" +
                "<table>" +
                "<tr><td>request.getMethod()     </td><td>" + show(request.getMethod())      + "</td></tr>" +
                "<tr><td>request.getRequestURI() </td><td>" + show(request.getRequestURI())  + "</td></tr>" +
                "<tr><td>request.getQueryString()</td><td>" + show(request.getQueryString()) + "</td></tr>" +
                "</table>");

        out.println("<h2>Métodos especiais da URI</h2>" +
                "<table>" +
                "<tr><td>request.getContextPath()</td><td>" + show(request.getContextPath()) + "</td></tr>" +
                "<tr><td>request.getServletPath()</td><td>" + show(request.getServletPath()) + "</td></tr>" +
                "<tr><td>request.getPathInfo()   </td><td>" + show(request.getPathInfo())    + "</td></tr>" +
                "</table>");

        out.println("<h2>Parâmetros da requisição</h2>");
        Map<String, String[]> parameters = request.getParameterMap();
        if (parameters.isEmpty()) {
            out.println("<p>Não foram passados parâmetros na requisição</p>");
        } else {
            out.println("<p>Aqui é a união entre os parâmetros da URL e os enviados por formulários via POST</p>" +
                    "<table>");
            parameters.forEach((name, values) -> {
                out.printf("<tr><td>request.getParameter(%s)</td><td>%s</td></tr>",
                        show(name), show(values[0]));
                if (values.length > 1) {
                    for (int i = 0; i < values.length; i++) {
                        out.printf("<tr><td>request.getParameterValues(%s)[%d]</td><td>%s</td></tr>",
                                show(name), i, show(values[i]));
                    }
                }
            });
            out.println("</table>");
        }

        out.println("<h2>Todos os cabeçalhos da requisição</h2>" +
                "<table>");
        Collections.list(request.getHeaderNames()).forEach(name -> {
            out.printf("<tr><td>request.getHeader(%s)</td><td>%s</td></tr>",
                    show(name), show(request.getHeader(name)));
        });
        out.println("</table>");

        if ("POST".equals(request.getMethod())) {
            out.println("<h2>Corpo da requisição</h2>" +
                    "<pre>request.getReader()</pre>"   +
                    "<pre style='background:#eee'>");
            request.getReader().lines().forEach(out::println);
            out.println("</pre>");
        }

        out.println("</body></html>");
    }

    private static String show(Object value) {
        String hexColor = "#000080", htmlValue = "null";
        if (value != null) {
            hexColor = "#008000";
            htmlValue = "\"" + value + "\"";
        }
        return String.format("<span style='color:%s'><b>%s</b></span>", hexColor, htmlValue);
    }
}
