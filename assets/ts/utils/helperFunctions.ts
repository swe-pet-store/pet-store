export function categoryTranslator(category: string) {
  switch (category) {
    case 'Dog':
      return 1
    case 'Cat':
      return 2
    case 'Other':
      return 3
    default:
      return null
  }
}
