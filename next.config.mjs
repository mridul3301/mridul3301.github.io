// next.config.mjs


import mdx from '@next/mdx';

const withMDX = mdx({
  extension: /\.mdx?$/,
});

export default withMDX({
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
});