export default interface CategoryTree {
  id: number;
  nameEn: string,
  nameSl: string,
  communitySuggestion?: boolean,
  parentId?: number;
  children?: CategoryTree[]
}
