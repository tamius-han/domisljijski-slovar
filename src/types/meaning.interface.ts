import Word from './word.interface';
import CategoryTree from './category-tree.interface';

export default interface Meaning {
  id: number;
  meaning: string;
  priority?: number;
  notes?: string;
  communitySuggestion?: boolean;

  translations?: Word[];
  categories: CategoryTree[];
}
