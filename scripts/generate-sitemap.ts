const { blogPosts } = require('../src/data/blog-posts');
const { join } = require('path');
const { writeFileSync } = require('fs');

// Get base URL from env or default
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.auzbizgroup.com';

// Helper to pad date
const getToday = () => new Date().toISOString().split('T')[0];

// Build URL entries
const urls = [];

// Static routes
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/about', priority: '0.5', changefreq: 'yearly' },
  { path: '/services', priority: '0.8', changefreq: 'weekly' },
  { path: '/packages', priority: '0.8', changefreq: 'weekly' },
  { path: '/blog', priority: '0.5', changefreq: 'weekly' },
  { path: '/contact', priority: '0.5', changefreq: 'yearly' },
];

for (const route of staticRoutes) {
  urls.push(`
    <url>
      <loc>${BASE_URL}${route.path}</loc>
      <lastmod>${getToday()}</lastmod>
      <changefreq>${route.changefreq}</changefreq>
      <priority>${route.priority}</priority>
    </url>`);
}

// Blog post routes
for (const post of blogPosts) {
  urls.push(`
    <url>
      <loc>${BASE_URL}/blog/${post.slug}</loc>
      <lastmod>${getToday()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
    </url>`);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

const outDir = join(process.cwd(), 'public');
const outFile = `${outDir}/sitemap.xml`;
writeFileSync(outFile, sitemap, 'utf8');
console.log(`Sitemap generated at ${outFile}`);