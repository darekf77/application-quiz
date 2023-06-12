import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { _ } from 'tnp-core'
import { Topic } from '../../../lib';

@Injectable()
export class TopicService {
  constructor(private router: Router) { }

  navigateToFirstQuestion(topic: Topic) {
    setTimeout(() => {
      const url = `/quiz/topic/${topic.topicTitleKebabCase}/question/num/1`
      console.log(`[topic] navigate to: ` + url)
      this.router.navigateByUrl(url);
    })
  }

}
