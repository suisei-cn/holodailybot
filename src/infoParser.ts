const platforms = [
  'Web',
  'Twitter',
  'Weibo',
  'YouTube',
  'Bilibili',
  'Niconico',
  'ACFun',
  'SoundCloud',
  'Pixiv',
  {
    slug: 'Afdian',
    name: '爱发电',
  },
  {
    slug: '163music',
    name: '网易云',
  },
  {
    slug: 'marshmallow',
    name: '棉花糖',
  },
  'Peing',
  {
    slug: 'Popiask',
    name: 'Popi提问箱',
  },
  'Telegram',
  'Wiki',
  'GitHub',
  'Userlocal',
]

const fmtPlatforms = platforms.map((x) => {
  if (typeof x === 'string') {
    return {
      slug: x.toLowerCase(),
      name: x,
    }
  }
  return {
    slug: x.slug.toLowerCase(),
    name: x.name,
  }
})

export const platformNames = fmtPlatforms.map((x) => x.slug)

export function getInfoLine(entries: { [key: string]: string | boolean }) {
  const keywords: string[] = []
  for (const { slug, name } of fmtPlatforms) {
    if (entries && entries[slug]) {
      const unofficial = entries[slug + '_official'] === false
      keywords.push(
        `<a href="${encodeURI(String(entries[slug]))}">${name}</a>${
          unofficial ? ' (非官方)' : ''
        }`
      )
    }
  }
  return keywords
}
