import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-savanna-results',
  templateUrl: './savanna-results.component.html',
  styleUrls: ['./savanna-results.component.scss'],
})
export class SavannaResultsComponent implements OnInit {
  constructor() {}
  rightAnswers = localStorage.getItem('savannaRightAnswers');
  wrongAnswers = localStorage.getItem('savannaWrongAnswers');
  ngOnInit(): void {}
}
