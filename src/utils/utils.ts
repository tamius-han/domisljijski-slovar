import TranslateResponse from '../types/translate-response.interface';
import Meaning from '../types/meaning.interface';
import Word, {WordGenderExtras} from '../types/word.interface';
import CategoryTree from '../types/category-tree.interface';
import WordFilter from '../types/word-filter.interface';


/**
 * Converts convenient-for-frontend WordFilter into the parameters
 * that backend actually understands
 */
export function worldFilter2qsParams(filter: WordFilter) {
  const qso: any = {
    s: filter.search,
    w: filter.id,
    m: filter.meaningId,
    cat: filter.categoryId,
    lang: filter.sourceLanguage
  };

  for (const key in qso) {
    if (!qso[key]) {
      delete qso[key];
    }
  }
  return qso;
}

/**
 * Builds query string (without the ? part)
 */
export function buildQs(params: any) {
  const qsParts = [];
  for (const key in params) {
    qsParts.push(`${key}=${encodeURIComponent(params[key])}`)
  }

  return `${qsParts.join('&')}`;
}

/**
 * Re-packs the word response we get from backend into something
 * a lil bit more structured.
 */
export function processTranslateResponse(wordResponse: TranslateResponse[], searchTerm?: string) {
  // this should ensure meanings related to the same word get grouped together
  const relevanceCache: {[wordId: number]: number} = {};
  const correctedResponses: TranslateResponse[] = [];

  // ensure the types of the response we got are correct + calculate relevance score
  // (if relevance score is relevant)
  for (const wr of wordResponse) {
    const response = correctTranslateResponseTypes(wr);

    // we calculate how relevant the word we got is to our search term
    // note that we can't really take altSpellingsHidden into account.
    // we only care about relevance if search term is provided
    if (searchTerm) {
      if (!relevanceCache[response.id]) {
        relevanceCache[response.id] = calculateWordRelevance(response, searchTerm);
      }
      response.relevance = relevanceCache[response.id];
    } else {
      response.relevance = 0;
    }

    correctedResponses.push(response);
  }

  /**
   * Sort the responses, in this order
   *    1. word relevance high-to-low
   *    2. word a-z
   *    3. meaning priority low-to-high
   *    4. meaning ID
   *    5. category ID
   *    6. translated word priority low-to-high
   *    7. translated word a-z
   *
   */
  correctedResponses.sort((a, b) => {
    if (a.relevance === b.relevance) {
      if (a.word < b.word) {
        return -1;
      } else if (a.word > b.word) {
        return 1;
      } else {
        if (a.meaningPriority === b.meaningPriority) {
          if (a.meaningId === b.meaningId) {
            if (a.categoryId === b.categoryId) {
              if (a.translatedWordPriority === b.translatedWordPriority) {
                if (a.translatedWord < b.translatedWord) {
                  return -1;
                } else {
                  return 1;
                }
              } else {
                return a.translatedWordPriority - b.translatedWordPriority;
              }
            } else {
              return a.categoryId - b.categoryId;
            }
          } else {
            return a.meaningId - b.meaningId;
          }
        } else {
          return a.meaningPriority - b.meaningPriority;
        }
      }
    } else {
      return b.relevance ?? 0 - (a.relevance ?? 0);
    }
  });

  // responses are sorted now — we can convert them into form that will be a bit more
  // friendly to our frontend

  const words: Word[] = [];
  let lastId, lastMeaningId, lastTranslationId, lastCategoryId;
  let lastWord: Word, lastMeaningSl: Meaning, lastMeaningEn: Meaning, lastCategory: CategoryTree;
  let firstCategory = true;

  for (const response of correctedResponses) {

    // word changed
    if (lastId !== response.id) {
      lastId = response.id;

      // we also reset all these — if word has changed, so have all the others
      lastMeaningId = null;
      lastTranslationId = null;
      lastCategoryId = null;

      lastWord = {
        id: response.id,
        language: response.language,
        word: response.word,
        altSpellings: response.altSpellings,
        type: response.type,
        genderExtras: parseGenderExtras(response.genderExtras),
        notes: response.notes,
        credit: response.credit,
        communitySuggestion: response.communitySuggestion,
        meaningsEn: [],
        meaningsSl: [],
      }

      words.push(lastWord);
    }

    // word is same (or handled), meaning changed
    if (lastMeaningId !== response.meaningId) {
      lastMeaningId = response.meaningId;

      lastCategoryId = null,
      lastTranslationId = null;

      const srcMeaning: Meaning = {
        id: response.meaningId,
        meaning: response.meaning,
        notes: response.meaningNotes,
        priority: response.meaningPriority,
        communitySuggestion: response.meaningCommunitySuggestion,
        categories: [],
        translations: [],
      };
      const dstMeaning: Meaning = {
        id: response.translatedMeaningId,
        meaning: response.translatedMeaning,
        notes: response.translatedMeaningNotes,
        communitySuggestion: response.translatedMeaningCommunitySuggestion,

        // this is correct — we sort translatedMeaning the same way as source meanings!
        // we use srcMeaning and dstMeaning for translating displayed content, and order
        // of meanings shouldn't change just because we display meanings of [source] word
        // in [target] language.
        priority: response.meaningPriority,

        categories: [],
        translations: []
      }

      // which of the two meanings is english and which slovenian depends on the language
      // of the source word, as source word is in same language as source meaning
      if (lastWord!.language === 'en') {
        lastMeaningEn = srcMeaning;
        lastMeaningSl = dstMeaning;
      } else {
        lastMeaningEn = dstMeaning;
        lastMeaningSl = srcMeaning;
      }

      lastWord!.meaningsEn!.push(lastMeaningEn);
      lastWord!.meaningsSl!.push(lastMeaningSl);
    }

    // meaning is the same, category changed
    // and this is where things get tricky. Category ID can be null because carelessness.
    if (lastCategoryId !== response.categoryId || !response.categoryId) {

      // this is needed, because we will only process translations for the first category
      // in order to avoid duplicating translation words
      if (lastCategoryId === null) {
        firstCategory = true;
      } else {
        firstCategory = false;
      }

      lastCategoryId = response.categoryId;
      lastTranslationId = null;

      lastCategory = {
        id: response.categoryId,
        parentId: response.categoryParentId,
        nameEn: response.categoryNameEn,
        nameSl: response.categoryNameSl,
        communitySuggestion: response.categoryCommunitySuggestion
      };

      lastMeaningEn!.categories.push(lastCategory);
      lastMeaningSl!.categories.push(lastCategory);
    }

    // translation words are the leaves and will always differ from previous run!
    if (firstCategory) {
      const translation: Word = {
        id: response.translatedWordId,
        language: response.language === 'en' ? 'sl' : 'en',
        word: response.translatedWord,
        genderExtras: parseGenderExtras(response.translatedWordGenderExtras),
        priority: response.translatedWordPriority,
        credit: response.translatedWordCredit,
        notes: response.translatedWordNotes
      };

      lastMeaningEn!.translations!.push(translation);
      lastMeaningSl!.translations!.push(translation);
    }
  }

  return words;
}

/**
 * Ensures that things we get from backend are numbers and booleans in places where
 * numbers and booleans are expected
 */
function correctTranslateResponseTypes(tr: any): TranslateResponse {
  return {
    ...tr,

    id: +tr.id,
    type: +tr.type,
    communitySuggestion: !!tr.communitySuggestion,

    // meaning associated with the source word
    meaningId: +tr.meaningId,
    meaningPriority: +tr.meaningPriority,
    meaningCommunitySuggestion: !!(+tr.meaningCommunitySuggestion),

    // same meaning, but in the other language
    translatedMeaningId: +tr.translatedMeaningId,
    translatedMeaningCommunitySuggestion: !!(+tr.translatedMeaningCommunitySuggestion),

    // translated word
    translatedWordId: +tr.translatedWordId,
    translatedWordPriority: +tr.translatedWordPriority,

    // category info
    categoryId: +tr.categoryId,
    categoryParentId: tr.translatedCategoryParentId ? +tr.categoryParentId : undefined,
    categoryCommunitySuggestion: !!(+tr.categoryCommunitySuggestion)
  };
}

/**
 * Parses GenderExtras from json response.
 * Returns WordGenderExtras object if genderExtrasString is defined.
 * Returns undefined if genderExtrasString is null, empty, or undefined.
 * Returns undefined if there were problems with parsing json.
 */
function parseGenderExtras(genderExtrasString?: string) {
  try {
    if (!genderExtrasString) {
      return undefined;
    }
    const geo = JSON.parse(genderExtrasString);
    return {
      female: geo.f,
      male: geo.m,
      plural: geo.plural ? {
        male_dual: geo.plural.m2,
        male_plural: geo.plural.m3,
        female_dual: geo.plural.f2,
        female_plural: geo.plural.f3
      } : undefined,
      common: geo.common
    }
  } catch (e) {
    console.warn(`[utils::parseGenderExtras] Could not parse gender extras for genderExtrasString:\n\n${genderExtrasString}\n\nError:`, e);
    return undefined;
  }
}


/**
 * Calculates how relevant is a given word (from response) to our search string
 */
function calculateWordRelevance(word: TranslateResponse, search: string) {
  const wordRelevanceScore = calculateWordMatchScore(word.word, search);
  const altSpellingRelevanceScore = calculateWordMatchScore(word.altSpellings, search);

  return Math.max(wordRelevanceScore, altSpellingRelevanceScore);
}

/**
 * Takes two words and very quickly, blindly, and inaccurately checks
 * if they match. This function assumes you've been a good :b:oi and
 * ensured that 'search' is roughly a substring of 'word' elsewhere
 */
function calculateWordMatchScore(word?: string, search?: string) {
  if (!word || !search || word.length < search.length) {
    return 0;
  }

  // if search length is approximately the same as our word length,
  // then chances are we want that word higher up on the list
  let matchScore = search.length / word.length;

  // we also award a special bonus for words that start with our
  // search term over the ones that don't
  if (word.startsWith(search)) {
    matchScore += 0.5;
  }

  return matchScore;
}
