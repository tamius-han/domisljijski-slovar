import WordType from '../enums/word-type.enum';
import Meaning from '../meaning.interface';

export default interface Word {
  id: number;
  language: string;
  word: string;
  altSpellings?: string;
  type?: WordType;
  genderExtras?: WordGenderExtras;
  notes?: string;
  credit?: string;
  communitySuggestion?: boolean;

  meaningsEn?: Meaning[];
  meaningsSl?: Meaning[];

  priority?: number;
}

export interface WordGenderExtras {
  female?: string;
  male?: string;
  common?: 'm' | 'f';
  plural?: {
    male_dual?: string;
    male_plural?: string;
    female_dual?: string;
    female_plural?: string;
  }
}
