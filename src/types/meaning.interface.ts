import Word from './word.interface';
import CategoryTree from './category-tree.interface';
import WordType from '@/enum/word-type.enum';

export default interface Meaning {
  id: number;
  meaning: string;
  priority?: number;      // this differs from database object — DB meanings don't have priority, but query gets meaning priority from words2meanings table
  notes?: string;
  communitySuggestion?: boolean;
  type: WordType;

  translations?: Word[];
  categories: CategoryTree[];
}
