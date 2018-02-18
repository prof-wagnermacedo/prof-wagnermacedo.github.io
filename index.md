---
title: Prof. Wagner Macêdo
---

{%- assign courses = site.pages
        | where_exp:"item", "item.type == 'index'"
        | where_exp:"item", "item.draft != true"
        | where_exp:"item", "item.hidden != true"
        | sort: "order"
        | group_by_exp:"item", "item.url | slice: 1, 6"
        | reverse -%}

{%- for c in courses %}

# {{ c.name }}

{%- for index in c.items %}
- [{{ index.title }}]({{ index.url }})
{%- endfor %}

{%- endfor %}

# Outros

- [Workshop de Shell Script](workshop-shell/)
