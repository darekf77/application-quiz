//#region imports
// @ts-nocheck
import {
  Answer,
  Question,
  Topic,
  type RawQuizApp,
} from '@darekf77/application-quiz/src';
import { Taon } from 'taon/src';
import { QueryRunner } from 'taon-typeorm/src';
import { _ } from 'tnp-core/src';
//#endregion

export const backendQuizData: RawQuizApp = {
  title: 'Quiz Application UI',
  topics: [
    {
      title: 'Design Patterns',
      question: [
        {
          title: 'What is S.O.L.I.D. in programming ?',
          answers: [
            {
              title:
                'single responsibility, open/closed, liskov substitution, interface segregation, dependency inversion.',
              isCorrect: true,
            },
            {
              title:
                'single responsibility, opennnes, liskov substitution, interface segregation, dependency inversion.',
              isCorrect: false,
            },
            {
              title:
                'single responsibility, obligatory, liskov substitution, interface segregation, dependency inversion.',
              isCorrect: false,
            },
            {
              title:
                'single resonable, obligatory, liskov substitution, interface segregation, dependency inversion.',
              isCorrect: false,
            },
            {
              title:
                'single responsibility, onimbus, liskov substitution, interface segregation, dependency inversion.',
              isCorrect: false,
            },
          ],
        },
        {
          title: 'What is the main design pattern implemented in RxJS library',
          answers: [
            {
              title: 'Iterator',
              isCorrect: false,
            },
            {
              title: 'Observer',
              isCorrect: true,
            },
            {
              title: 'Strategy',
              isCorrect: false,
            },
            {
              title: 'Adapter',
              isCorrect: false,
            },
            {
              title: 'Bridge',
              isCorrect: false,
            },
          ],
        },
        {
          title: 'What are "code smells" in programming ?',
          answers: [
            {
              title: 'a result of smelly coding books',
              isCorrect: false,
            },
            {
              title: 'a result of not getting proper shower before coding',
              isCorrect: false,
            },
            {
              title: 'a result smelly keyboard',
              isCorrect: false,
            },
            {
              title: 'a result of poor or misguided programming',
              isCorrect: true,
            },
            {
              title: 'a result using hamster instead of mouse',
              isCorrect: false,
            },
          ],
        },
      ],
    },
    {
      title: 'Angular',
      question: [
        {
          title:
            'What is the proper way of using async pipe in angular template ?',
          answers: [
            {
              title: '<ul *ngIf="allUsers() | async; else loader; let users" >',
              isCorrect: true,
            },
            {
              title: '<ul *ngIf="allUsers(); else loader; let users" async  >',
              isCorrect: false,
            },
            {
              title: '<ul *ngIf="async(allUsers())"   >',
              isCorrect: false,
            },
            {
              title: '<ul *ngIf="async(allUsers()) | pipe"  >',
              isCorrect: false,
            },
            {
              title: '<ul ng-if="allUsers() | async; else loader;"  >',
              isCorrect: false,
            },
          ],
        },
        {
          title:
            'What are the differences between Component and Directive in Angular ?',
          answers: [
            {
              title: 'no difference',
              isCorrect: false,
            },
            {
              title: 'there are the same thing',
              isCorrect: false,
            },
            {
              title: 'directive is a component without template',
              isCorrect: true,
            },
            {
              title: 'nothing beside name',
              isCorrect: false,
            },
            {
              title: 'it depends',
              isCorrect: false,
            },
          ],
        },
        {
          title: 'Which hook is going to fire first in Angular ?',
          answers: [
            {
              title: 'ngAfterViewInit',
              isCorrect: false,
            },
            {
              title: 'ngOnInit',
              isCorrect: false,
            },
            {
              title: 'ngAfterContentInit',
              isCorrect: false,
            },
            {
              title: 'ngOnChanges',
              isCorrect: true,
            },
            {
              title: 'ngDoCheck',
              isCorrect: true,
            },
          ],
        },
      ],
    },
    {
      title: 'Java',
      question: [
        {
          title: 'What is an Java Applet ?',
          answers: [
            {
              title:
                'A Java Applet is program that can be included in mysql database',
              isCorrect: false,
            },
            {
              title:
                'A Java Applet is program that can be included command line',
              isCorrect: false,
            },
            {
              title:
                'A Java Applet is program that can be included in a HTML page and be executed in a java enabled client browser.',
              isCorrect: true,
            },
            {
              title: 'A Java Apple command line interface',
              isCorrect: false,
            },
            {
              title: 'All above answers are false',
              isCorrect: false,
            },
          ],
        },
        {
          title: 'What is the difference between processes and threads?',
          answers: [
            {
              title:
                'a Process is a program which is executing some code and Thread is an independent path of execution in the process.',
              isCorrect: true,
            },
            {
              title: 'there are the same thing',
              isCorrect: false,
            },
            {
              title: 'multiple thread are slower than multiple processes',
              isCorrect: false,
            },
            {
              title: 'it depens on CPU',
              isCorrect: false,
            },
            {
              title: 'it depens on GPU',
              isCorrect: false,
            },
          ],
        },
        {
          title: ' What is a Servlet ?',
          answers: [
            {
              title:
                'The servlet is a Java programming language class used to process client requests and generate database entites.',
              isCorrect: false,
            },
            {
              title:
                'The servlet is a Java programming language class used to process client requests and generate stdin inputs.',
              isCorrect: false,
            },
            {
              title:
                'The servlet is a Java programming language class used to process client requests and generate dynamic web content.',
              isCorrect: true,
            },
            {
              title:
                'The servlet is a Java programming language class used to process server requests.',
              isCorrect: false,
            },
            {
              title:
                'The servlet is a Java class used to process server requests.',
              isCorrect: false,
            },
          ],
        },
      ],
    },
  ],
};

@Taon.Migration({
  className: 'ApplicationQuizContext_1746214744218_dataLoad',
})
export class ApplicationQuizContext_1746214744218_dataLoad extends Taon.Base
  .Migration {
  questionRepository = this.injectRepo(Question);

  topicRepository = this.injectRepo(Topic);

  answerRepository = this.injectRepo(Answer);

  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.startTransaction();
    try {
      const topics = [];
      for (let index = 0; index < backendQuizData.topics.length; index++) {
        let topic = Topic.from(backendQuizData.topics[index]);
        topic.topicTitleKebabCase = _.kebabCase(topic.title);
        const questions = _.cloneDeep(topic.question);
        topic.questionsOids = _.times(questions.length, n => n + 1);
        topic = await this.topicRepository.save(topic);
        topics[index] = topic;
        for (let index2 = 0; index2 < questions.length; index2++) {
          let question = Question.from(questions[index2]);
          question.topicId = topic.id;
          question.oid = index2 + 1;
          const anwsers = _.cloneDeep(question.answers);
          if (index2 === 0) {
            question.prevOid = null;
          } else {
            question.prevOid = question.oid - 1;
          }
          if (index2 === questions.length - 1) {
            question.nextOid = null;
          } else {
            question.nextOid = question.oid + 1;
          }
          question = await this.questionRepository.save(question);
          topic.question = Array.isArray(topic.question) ? topic.question : [];
          topic.question[index2] = question;
          for (let index3 = 0; index3 < anwsers.length; index3++) {
            let answer = Answer.from(anwsers[index3]);
            answer.questionId = question.id;
            answer.Oid = index3 + 1;
            answer = await this.answerRepository.save(answer);
            question.answers = Array.isArray(question.answers)
              ? question.answers
              : [];
            question.answers[index3] = answer;
          }
        }
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    // revert this "something" in db
    await this.questionRepository.clear();
    await this.topicRepository.clear();
    await this.answerRepository.clear();
  }
}
