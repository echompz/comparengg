export const baseUrl = 'https://comparengg.vercel.app/'

export default async function sitemap() {
  const staticRoutes = ['', '/gwacalculator', '/prereq', '/curriculum'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return staticRoutes
}