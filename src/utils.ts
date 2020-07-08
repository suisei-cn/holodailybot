export function getHumanReadableDate(date: Date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

export function extractQuery(body: any): string | undefined {
  if (body.message) {
    const msg = body.message.text || ''
    const lowerQuery = msg.toLowerCase()
    if (
      lowerQuery.startsWith('/my ') ||
      lowerQuery.startsWith('/my@holodailybot') ||
      lowerQuery === '/my' ||
      lowerQuery === '/my@holodailybot'
    ) {
      return msg.replace(/^\/my(@holodailybot)? ?/i, '')
    }
    return
  } else if (body.inline_query) {
    return body.inline_query.query || ''
  }
  return
}
