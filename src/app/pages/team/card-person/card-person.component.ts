import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import IPerson from '../../../models/aboutUs';

@Component({
  selector: 'app-card-person',
  templateUrl: './card-person.component.html',
  styleUrls: ['./card-person.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CardPersonComponent {
  @Input() person: IPerson;

  @ViewChild('descriptionRef') descriptionRef: ElementRef;
}
