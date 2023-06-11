export interface RawQuizApp {
  title: string;
  topics: RawTopic[];
}

export interface RawTopic {
  title: string;
  question: RawQuestion[];
}

export interface RawQuestion {
  title: string;
  answers: RawAnswer[];
}

export interface RawAnswer {
  title: string;
  isCorrect?: boolean;
}
