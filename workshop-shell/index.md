---
title: Workshop de Shell Script
description: Prof. Wagner Macêdo
layout: course
---

{%- assign coursePages = site.pages | where_exp:"item", "item.draft != true"
                                    | where_exp:"item", "item.hidden != true"
                                    | where_exp:"item", "item.url != page.url"
                                    | where_exp:"item", "item.url contains page.url" -%}

## Slides

{% assign classnotes = coursePages | where_exp:"item", "item.type == 'classnote'"
                                   | sort: "date" -%}
{%- for p in classnotes %}
- [{{ p.title }}]({{ p.url }})
{%- endfor %}

## Exemplos

{% assign examplesUrl = page.url | append: 'exemplos/' %}
{% assign examples = coursePages | where_exp:"item", "item.url contains examplesUrl"
                                 | sort: "order" -%}

{%- for p in examples %}
- [<kbd>{{ p.name | remove: '.md' }}</kbd>]({{ p.url }})
{%- endfor %}
