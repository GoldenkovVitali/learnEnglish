import { EventEmitter, Injectable, Output } from '@angular/core';
import { ElectronicTextbookService } from '@app/pages/electronic-textbook/electronic-textbook.service';
import { WordsApiService } from '@app/server/api';

import { IFileModel } from '../models/FileModel';
import { IUserDataModel } from '../models/UserDataModel';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  clickLogin: EventEmitter<boolean> = new EventEmitter();
  clickRegister: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private apiService: WordsApiService,
    private textbookService: ElectronicTextbookService
  ) {}

  singUp(name: string, password: string, email: string, imgPath: IFileModel[]): void {
    const newFile =
      imgPath === undefined
        ? new File([''], '', {
            type: 'image/jpg',
          })
        : imgPath[0];
    this.apiService.createUser(name, email, password, newFile).subscribe(() => {
      this.textbookService.openSnackBar('Успешная регистрация, войдите');
      this.clickRegister.emit(true);
    });
  }

  logIn(password: string, email: string): void {
    this.apiService.signIn(email, password).subscribe((res: IUserDataModel) => {
      this.textbookService.openSnackBar('Успешный вход');
      localStorage.setItem('userId', res.userId);
      localStorage.setItem('token', res.token);
      localStorage.setItem('refreshToken', res.refreshToken);
      this.clickLogin.emit(false);
      this.textbookService.getUserWords(res.userId, res.token);
    });
  }
}
