export const baseUrl = 'https://hanhdd.prof';

export default async function sitemap() {
  let routes = ['', '/teaching', '/publications'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes];
}
