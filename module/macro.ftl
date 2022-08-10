<#macro layout title>
  <!DOCTYPE html>
  <html lang="zh">
    <head>
      <meta charset="UTF-8">
      <meta name="keywords" content="${meta_keywords!}"/>
      <meta name="description" content="${meta_description!}" />
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover">
      <meta name="theme-color" content="#009688">
      <link href="${theme_base!}/source/lib/remixicon/remixicon.css" rel="stylesheet">
      <link rel="stylesheet" href="${theme_base!}/source/css/style.css">
      <#include "${theme_base!}/component/component-style.ftl">
      <link rel="stylesheet" href="https://unpkg.com/element-plus/dist/index.css">
      <link rel="stylesheet" href="https://unpkg.com/element-plus/theme-chalk/dark/css-vars.css">
      <script src="https://unpkg.com/vue@3"></script>
      <script src="https://unpkg.com/element-plus"></script>
      <#if is_post?? && is_sheet??>
        <script src="${options.comment_internal_plugin_js!'//cdn.jsdelivr.net/npm/halo-comment-normal@1.1.1/dist/halo-comment.min.js'}"></script>
        <script>
          var configs = {
              autoLoad: true,
              showUserAgent: true
          }
        </script>
      </#if>
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
        <el-container>
          <el-header><#include "menu.ftl"></el-header>
          <el-main>
            <el-row justify="center">
              <el-col :xs="24" :sm="20" :md="20" :lg="16" :xl="16">
                <#nested >
                <#include "test.ftl">
              </el-col>
            </el-row>
          </el-main>
          <el-footer>Footer<roy-day-night /></el-footer>
        </el-container>
      </div>
      <@global.footer />
      <script type="module">
        const App = {
          data() {
            return {};
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

