import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { __param } from 'tslib';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit{

  totalQuestions: number = 0;
  attemptedQuestions: number = 0;
  correctAnswers: number = 0;

  constructor(private route: ActivatedRoute){}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.totalQuestions = +params['total'];
      this.attemptedQuestions = +params['attempted'];
      this.correctAnswers = +params['correct'];
    })
  }
 recommed = (this.correctAnswers / this.totalQuestions) * (33/100) ? "Pass" : "Fail";
 heading = (this.correctAnswers / this.totalQuestions) * (33/100) ? "Congratulations" : "Alas";
}
