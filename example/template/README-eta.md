# Example

| 圖片 | 番劇 |
| --- | --- |
<% it.data.forEach(function (anime) { %>
| <img src="<%= anime.subject.images.grid %>" width="48"> | <%= anime.subject.name_cn %> |
<% }) %>

| 圖片 | 番劇 | 圖片 | 番劇 |
| --- | --- | --- | --- |
<% it.data.forEach(function (anime) { %><%= anime.index % 2 == 1 ? '|' : '' %> <img src="<%= anime.subject.images.grid %>" width="48"> | <%= anime.subject.name_cn %> |<%= anime.index % 2 == 0 ? '\n' : '' %><% }) %><%= it.data.length % 2 == 0 ? '' : ' | |\n' %>
