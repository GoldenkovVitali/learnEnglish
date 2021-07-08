export interface IWord {
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  id: string;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
  wordsPerExampleSentence: number;
  userWord?: IUserWord;
}

export interface ICardInfo {
  isTextExampleTranslate: boolean;
  isWordTranslate: boolean;
  isButtonDelete: boolean;
  isButtonAdd: boolean;
}

export interface IUserWord {
  difficulty: string;
  id: string;
  optional: IOptional;
  wordId: string;
}

export interface IOptional {
  date: number;
  repeat: number;
  delete: boolean;
  optionalField?: string | null;
  isDeleted?: boolean;
}

export interface IUserInfo {
  token: string;
  userId: string;
}
