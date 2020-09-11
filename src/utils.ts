export function getHumanReadableDate(date: Date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

const regEx = /^\/([a-z-_]+)(@[a-z0-9-_]+)? ?/i

export function extractQuery(body: any): string[] | undefined {
  if (body.message) {
    const msg = body.message.text || ''
    const lowerQuery: string = msg.toLowerCase()
    const match = lowerQuery.match(regEx)
    if (match === null) return
    return [lowerQuery.replace(regEx, ''), match[1] || '']
  } else if (body.inline_query) {
    return [body.inline_query.query || '', '']
  }
  return
}
