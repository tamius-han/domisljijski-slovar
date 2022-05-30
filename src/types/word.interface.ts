import WordType from '../enums/word-type.enum';
import Meaning from '../meaning.interface';

export default interface Word {
  id: number;
  language: string;
  word: string;
  altSpellings?: string;
  genderExtras?: WordGenderExtras;
  notes?: string;
  etymology?: string;
  credit?: string;
  communitySuggestion?: boolean;

  meaningsEn?: Meaning[];
  meaningsSl?: Meaning[];

  priority?: number;  // word doesn't have priority on DB, but queries get priority from words2meanings table
}

export interface WordGenderExtras {
  female?: string;
  male?: string;
  common?: 'm' | 'f';
  gender?: 'm' | 'f';
  plural?: {
    male_dual?: string;
    male_plural?: string;
    female_dual?: string;
    female_plural?: string;
  }
}
