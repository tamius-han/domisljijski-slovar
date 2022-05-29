export default interface WordFilter {
  id?: number,
  meaningId?: number,
  categoryId?: number,
  search?: string,
  sourceLanguage?: 'en' | 'sl',
}
