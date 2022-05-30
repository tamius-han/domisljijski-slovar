import WordType from '../enums/word-type.enum';

export default interface TranslateResponse {
  // source word
  id: number,
  language: string,
  word: string,
  altSpellings?: string,
  genderExtras?: string;
  notes?: string;
  etymology?: string;
  credit?: string;
  communitySuggestion?: boolean;

  // meaning associated with the source word
  meaningId: number;
  meaning: string;
  meaningType: WordType;
  meaningNotes?: string;
  meaningPriority: number;
  meaningCommunitySuggestion: boolean;

  // same meaning, but in the other language
  translatedMeaningId: number;
  translatedMeaning: string;
  translatedMeaningNotes?: string;
  translatedMeaningCommunitySuggestion: boolean;

  // translated word
  translatedWordId: number;
  translatedWord: string;
  translatedWordGenderExtras: string;
  translatedWordPriority: number;
  translatedWordCredit?: string;
  translatedWordNotes?: string;
  translatedWordEtymology?: string;

  // category info
  categoryId: number;
  categoryParentId?: number;
  categoryNameEn: string;
  categoryNameSl: string;
  categoryCommunitySuggestion: boolean;

  // extras that we add on frontend
  // may be received from backend at some point
  relevance?: number;
}
