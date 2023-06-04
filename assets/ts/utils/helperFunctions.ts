export function categoryTranslator(category: string) {
  switch (category) {
    case 'Dog':
      return 1
    case 'Cat':
      return 2
    case 'Other':
      return 3
    case 'All':
      return 0
    default:
      return null
  }
}
