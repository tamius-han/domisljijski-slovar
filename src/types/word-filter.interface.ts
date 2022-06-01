export default interface WordFilter {
  id?: number,
  meaningId?: number,
  categoryIds?: number[],
  search?: string,
  sourceLanguage?: 'en' | 'sl',


  page?: number;
  limit?: number;
}
