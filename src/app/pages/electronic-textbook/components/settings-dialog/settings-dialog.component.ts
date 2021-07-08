import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ElectronicTextbookService } from '../../electronic-textbook.service';
import { ICardInfo } from '../../word';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss'],
})
export class SettingsDialogComponent {
  options: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ICardInfo,
    public dialogRef: MatDialogRef<SettingsDialogComponent>,
    formBuilder: FormBuilder,
    private textBookService: ElectronicTextbookService
  ) {
    this.options = formBuilder.group({ ...data });
  }

  onFormSubmit(): void {
    this.textBookService.setCardInfo(this.options.value);
    this.dialogRef.close();
  }
}
