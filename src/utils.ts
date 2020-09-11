export function getHumanReadableDate(date: Date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

export function extractQuery(body: any): string | undefined {
  if (body.message) {
    const msg = body.message.text || ''
    const lowerQuery: string = msg.toLowerCase()
    if (!lowerQuery.startsWith('/') || lowerQuery.length === 1) return
    return msg.replace(/^\/[a-z-_]+(@[a-z0-9-_]+)? ?/i, '')
  } else if (body.inline_query) {
    return body.inline_query.query || ''
  }
  return
}
