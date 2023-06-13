//#region @websql
import { RawQuizApp } from "./models";

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
              title: 'single responsibility, open/closed, liskov substitution, interface segregation, dependency inversion.',
              isCorrect: true,
            },
            {
              title: 'single responsibility, opennnes, liskov substitution, interface segregation, dependency inversion.',
              isCorrect: false,
            },
            {
              title: 'single responsibility, obligatory, liskov substitution, interface segregation, dependency inversion.',
              isCorrect: false,
            },
            {
              title: 'single resonable, obligatory, liskov substitution, interface segregation, dependency inversion.',
              isCorrect: false,
            },
            {
              title: 'single responsibility, onimbus, liskov substitution, interface segregation, dependency inversion.',
              isCorrect: false,
            }
          ]
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
          ]
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
          ]
        }
      ]
    },
    {
      title: 'Angular',
      question: [
        {
          title: 'What is the proper way of using async pipe in angular template ?',
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
            }
          ]
        },
        {
          title: 'What are the differences between Component and Directive in Angular ?',
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
            }
          ]
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
            }
          ]
        }
      ]
    },
    {
      title: 'Java',
      question: [
        {
          title: 'What is an Java Applet ?',
          answers: [
            {
              title: 'A Java Applet is program that can be included in mysql database',
              isCorrect: false,
            },
            {
              title: 'A Java Applet is program that can be included command line',
              isCorrect: false,
            },
            {
              title: 'A Java Applet is program that can be included in a HTML page and be executed in a java enabled client browser.',
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
          ]
        },
        {
          title: 'What is the difference between processes and threads?',
          answers: [
            {
              title: 'a Process is a program which is executing some code and Thread is an independent path of execution in the process.',
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
            }
          ]
        },
        {
          title: ' What is a Servlet ?',
          answers: [
            {
              title: 'The servlet is a Java programming language class used to process client requests and generate database entites.',
              isCorrect: false,
            },
            {
              title: 'The servlet is a Java programming language class used to process client requests and generate stdin inputs.',
              isCorrect: false,
            },
            {
              title: 'The servlet is a Java programming language class used to process client requests and generate dynamic web content.',
              isCorrect: true,
            },
            {
              title: 'The servlet is a Java programming language class used to process server requests.',
              isCorrect: false,
            },
            {
              title: 'The servlet is a Java class used to process server requests.',
              isCorrect: false,
            },
          ]
        }
      ]
    }
  ]
}
//#endregion
