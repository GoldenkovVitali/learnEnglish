import { Component, OnInit } from '@angular/core';

import IPerson from '@app/models/aboutUs';

import person from '../../../../assets/data/persons.json';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export default class AboutUsComponent implements OnInit {
  persons: IPerson[];

  ngOnInit(): void {
    this.persons = person;
  }
}
