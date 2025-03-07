import createMDX from '@next/mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { withContentCollections } from "@content-collections/next";

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
    output: 'standalone',
    reactStrictMode: true,
    ...config,
  };
  return withContentCollections(withMDX(nextConfig));
}

export default nextConfig;
