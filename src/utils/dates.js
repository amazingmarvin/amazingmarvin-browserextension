export function formatDate (date) {
  const offset = date.getTimezoneOffset()
  let correctDate = new Date(date.getTime() - (offset*60*1000))

  return correctDate.toISOString().split('T')[0]
}