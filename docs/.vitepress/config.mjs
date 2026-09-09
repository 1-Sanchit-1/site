import { defineConfig } from "vitepress";

export default defineConfig({
  // Base URL when deploying
  base: "/site",

  // Basic site metadata
  lang: "en-US",
  title: "Sanchit Gupta",
  description: "AI Infrastructure Engineer — LLM inference on GPU, in air-gapped environments",
  lastUpdated: true,
  appearance: true, // Enables dark mode
  ignoreDeadLinks: true,

  // Markdown configuration
  markdown: {
    lineNumbers: true, // Show line numbers in code blocks
  },

  // Theme and site configuration
  themeConfig: {
    // Search settings
    search: {
      provider: "local",
    },

    // Last updated label
    lastUpdatedText: "Updated Date",

    // Footer message
    footer: {
      message: "<<>> with ♥️ by S@Nchit", // Custom footer message
    },

    // "Edit this page" link configuration
    editLink: {
      text: "Edit this page on GitHub",
      pattern: "https://github.com/1-Sanchit-1/site/edit/main/:path",
    },

    // Logo displayed in the navbar
    logo: "/solution.png",

    // Navigation bar configuration
    nav: [
      { text: "🏠 Home", link: "/" },
      { text: "💼 Experience", link: "/Experience/index" },
      { text: "🛠️ Skills", link: "/Skills/index" },
      { text: "🎓 Education", link: "/Education/index" },
      { text: "🚀 Projects", link: "/Projects/index" },
      { text: "📝 Learning", link: "/Learning/index" },
      { text: "📩 Contact Me", link: "/Contact Me/index" },
    ],

    // Uncomment sidebar if needed in the future
    // sidebar: [
    //   {
    //     items: [
    //       { text: 'Education', link: '/Education/index' },
    //       { text: 'Projects', link: '/Projects/index' },
    //       { text: 'Blogs', link: '/Blogs/index' },
    //       { text: 'Contact Me', link: '/Contact Me/index' }
    //     ]
    //   }
    // ],

    // Social media links
    socialLinks: [
      {
        icon: "linkedin",
        link: "https://www.linkedin.com/in/sanchit-gupta-15a1b9229/",
      },
      { icon: "github", link: "https://github.com/1-Sanchit-1" },
    ],
  },
});
