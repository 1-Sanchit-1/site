import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config

export default defineConfig({
  base: '/site',
  lang: 'en-US',
  title: "Sanchit Gupta",
  description: "Problem Solver",
  lastUpdated: true ,
  appearance: true,
  ignoreDeadLinks: true,
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    search: {
      provider: 'local'
    },
    lastUpdatedText: 'Updated Date',
    footer: {
      message:   ' <</>> with ♥️ by S@Nchit  ',
    },
    editLink: {
      text: 'Edit this page on GitHub',
      pattern: 'https://github.com/1-Sanchit-1/site'
    },
    logo : '/solution.png', 
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '🏠 Home', link: '/' },
      { text: '🎓 Education', link: '/Education/index' },
      { text: '🚀 Projects', link: '/Projects/index' },
      { text: '📝 Blogs', link: '/Blogs/index' },
      { text: '📩 Contact Me', link: '/Contact Me/index' }
    ],
    
    // sidebar: [
    //   {
    //     // text: 'Examples',
    //     items: [
    //       { text: 'Education', link: '/Education/index' },
    //       { text: 'Projects', link: '/Projects/index' },
    //       { text: 'Blogs', link: '/Blogs/index' },
    //       { text: 'Contact Me', link: '/Contact Me/index' }
    //     ]
    //   }
    // ],

    socialLinks: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/sanchit-gupta-15a1b9229/' },
      { icon: 'github', link: 'https://github.com/1-Sanchit-1' },
      // { icon: '', link: 'https://github.com/vuejs/vitepress' }      
    ],
 
  }
})