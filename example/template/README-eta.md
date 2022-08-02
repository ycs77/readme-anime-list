# Example

| 圖片 | 番劇 |
| --- | --- |
<% it.data.forEach(function (anime) { %>
| ![](<%= anime.subject.images.grid %>) | <%= anime.subject.name_cn %> |
<% }) %>

| 圖片 | 番劇 | 圖片 | 番劇 |
| --- | --- | --- | --- |
<% it.data.forEach(function (anime, index) { %><%= anime.index % 2 == 1 ? '|' : '' %> ![](<%= anime.subject.images.grid %>) | <%= anime.subject.name_cn %> |<%= anime.index % 2 == 0 ? '\n' : '' %><% }) %>
