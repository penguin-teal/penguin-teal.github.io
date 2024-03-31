import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
    markdown: {
        remarkPlugins: [ remarkToc ],
        rehypePlugins: [ rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }] ],
        shikiConfig: {
          // Choose from Shiki's built-in themes (or add your own)
          // https://github.com/shikijs/shiki/blob/main/docs/themes.md

          // Alternatively, provide multiple themes
          // https://github.com/antfu/shikiji#lightdark-dual-themes
          themes: {
            light: 'github-light',
            dark: 'github-dark',
          },
          // Add custom languages
          // Note: Shiki has countless langs built-in, including .astro!
          // https://github.com/shikijs/shiki/blob/main/docs/languages.md
          langs: [ "c", "bash" ],
          // Enable word wrap to prevent horizontal scrolling
          wrap: true,
        }
    },
	integrations: [
		starlight({
			title: 'penguin-teal',
			social: {
				github: 'https://github.com/penguin-teal/penguin-teal.github.io',
			},
			sidebar: [
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				}
			],
		}),
	],
});
