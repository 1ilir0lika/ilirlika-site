import DefaultTheme from 'vitepress/theme';
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import { useData, useRoute } from 'vitepress';
import { toRefs } from "vue";

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx);
  },
  setup() {
    const { frontmatter } = toRefs(useData());
    const route = useRoute();

    giscusTalk({
      repo: '1ilir0lika/ilirlika-site',
      repoId: 'R_kgDOO3mqsA',
      category: 'General',
      categoryId: 'DIC_kwDOO3mqsM4CrfvM',
      mapping: 'pathname',
      inputPosition: 'bottom',
      lang: 'en',
      reactionsEnabled: '0',
      emitMetadata: '0',
      theme: 'preferred_color_scheme',
      loading: 'lazy',
      lightTheme: 'light',
      darkTheme: 'transparent_dark',
    }, {
      frontmatter,
      route
    }, true);
  }
};
