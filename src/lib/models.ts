export interface IQuizApp {
  title: string;
  topics: ITopic[];
}

export interface ITopic {
  title: string;
  question: IQuestion[];
}

export interface IQuestion {
  title: string;
  answers: IAnswer[];
}

export interface IAnswer {
  title: string;
  isCorrect?: boolean;
}
