<#macro layout title>
  <!DOCTYPE html>
  <html lang="zh">
    <head>
      <meta charset="UTF-8">
      <meta name="keywords" content="${meta_keywords!}"/>
      <meta name="description" content="${meta_description!}" />
      <link href="${theme_base!}/source/lib/remixicon/remixicon.css" rel="stylesheet">
      <link rel="stylesheet" href="${theme_base!}/source/css/style.css">
      <link rel="stylesheet" href="https://unpkg.com/element-plus/dist/index.css">
      <link rel="stylesheet" href="https://unpkg.com/element-plus/theme-chalk/dark/css-vars.css">
      <script src="https://unpkg.com/vue@3"></script>
      <script src="https://unpkg.com/element-plus"></script>
      <script type="importmap">
        {
          "imports": {
            "RoyComp": "${theme_base!}/component/index.js"
          }
        }
      </script>
      <@global.head />
      <title>${title}</title>
    </head>
    <body>
      <div id="app" class="roy-theme">
        <#include "menu.ftl">
        <#--  <#nested >  -->
        <div class="roy-day-night-switcher">
          <input type="checkbox" @click="changeDayNight">
          <span></span>
        </div>
        <roy-day-night />
      </div>
      <@global.footer />
      <script type="module">
        const App = {
          data() {
            return {
              message: "Hello Element Plus",
              checked: false
            };
          },
          methods: {
            changeDayNight() {
              if (document.querySelector('html').classList.contains('dark')) {
                document.querySelector('html').classList.remove('dark')
              } else {
                document.querySelector('html').classList.add('dark')
              }
            }
          },
        };
        window.VUE_APP = Vue.createApp(App);
        import RoyComp from 'RoyComp';
        const app = window.VUE_APP
        app.use(RoyComp);
        app.use(ElementPlus);
        app.mount("#app");
      </script>
    </body>
  </html>
</#macro>

