{% assign filename = page.name | remove: '.md' %}

## <kbd>{{ filename }}</kbd>

```{{ include.language }}
{% include_relative {{ filename }} %}
```

<style>
  section.page-header,
  section.main-content > footer {
    display: none;
  }
  
  section.main-content {
    margin: 0;
    padding: 1em;
  }
</style>
