import createMDX from '@next/mdx';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { withContentCollections } from "@content-collections/next";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter,remarkMdxFrontmatter],
    rehypePlugins: [],
  },
});

const nextConfig = (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */

  const config = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    experimental: {
      turbo: {
        resolveExtensions: [
          '.web.js',
          '.mdx',
          '.tsx',
          '.ts',
          '.jsx',
          '.js',
          '.mjs',
          '.json',
        ],
      },
    },
    webpack: (config) => {
      config.resolve.alias['@react-platform/svg/lib/cjs/core.js'] = path.resolve(__dirname, '.', 'node_modules', '@react-platform/svg/lib/cjs/core.web.js');
      return config;
    }
  };

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return withContentCollections(withMDX({
      ...defaultConfig,
      ...config,
      reactStrictMode: true,
      /* development only config options here */
    }));
  }

  const nextConfig = {
    output: process.env.EXPORT_MODE === 'output' ? 'output' : 'standalone',
    reactStrictMode: true,
    ...config,
  };
  return withContentCollections(withMDX(nextConfig));
}

export default nextConfig;
