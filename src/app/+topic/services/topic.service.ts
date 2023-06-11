import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { _ } from 'tnp-core'
import { Topic } from '../../../lib';

@Injectable()
export class TopicService {
  constructor(private router: Router) { }

  navigateToFirstQuestion(topic: Topic) {
    setTimeout(() => {
      console.log(`navigate to: ` + `/quiz/topic/${_.kebabCase(topic.title)}/question/${topic.firstQuestionId}`)
      this.router.navigateByUrl(`/quiz/topic/${_.kebabCase(topic.title)}/question/${topic.firstQuestionId}`)
    })
  }

}
