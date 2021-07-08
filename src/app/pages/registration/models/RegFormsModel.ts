import { FormGroup } from '@angular/forms';

interface ValueObj {
  name: string;
  email: string;
  password: string;
}

export interface IRegForm extends FormGroup {
  value: ValueObj;
}
