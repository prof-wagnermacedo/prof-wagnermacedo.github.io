---
title: Workshop de Shell Script
description: Prof. Wagner Macêdo
layout: course
---

{%- assign coursePages = site.pages | where_exp:"item", "item.draft != true"
                                    | where_exp:"item", "item.hidden != true"
                                    | where_exp:"item", "item.url != page.url"
                                    | where_exp:"item", "item.url contains page.url" -%}

## Conteúdo

- [Usos para Shell Script](1-usos-para-shell.html)

1. O Ambiente Linux
2. O Ambiente Shell
    - Principais sabores de Shell
3. Funcionamento do Shell
    - Atribuição
    - Comando
    - Caracteres para remoção de significado
        - Apóstrofo
        - Contrabarra                         
        - Aspas                               
    - Caracteres de redirecionamento        
    - Subcomandos (<code>``</code>)
    - Variáveis (`$`)  
4. Comando `grep`                          
5. Parâmetros para um script             
    - Parâmetros especiais                
6. Condicional: `if`
7. Comando `test`                         
8. Condicional: `case`                    
9. Loop: `for`                            
10. Matemática no shell                  
11. Loop: `while`                          
12. Comando `read`                         

## Exemplos

{% assign examplesUrl = page.url | append: 'exemplos/' %}
{% assign examples = coursePages | where_exp:"item", "item.url contains examplesUrl"
                                 | sort: "order" -%}

{%- for p in examples %}
- [<kbd>{{ p.name | remove: '.md' }}</kbd>]({{ p.url }})
{%- endfor %}
