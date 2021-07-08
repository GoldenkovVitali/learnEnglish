import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostBinding,
  EventEmitter,
  Output,
  OnChanges,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';
import { WordsApiService } from '@app/server/api';

@Component({
  selector: 'header[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() isAuthenticated;
  @HostBinding('class') class = 'header';
  token: string | null;
  id: string | null;
  refreshToken: string | null;
  userName = '';
  userImg;

  @Output() clickAutnBtnEvent = new EventEmitter<boolean>();
  @Output() isLogin = new EventEmitter<boolean>();

  constructor(public wordsApiService: WordsApiService, private route: Router) {}

  ngOnInit(): void {
    this.getUser();
  }

  logOut(): void {
    this.wordsApiService.deleteUser(this.id, this.token);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.token = null;
    this.id = null;
    this.isLogin.emit(false);
    this.route.navigate([``]);
  }

  getUser(): void {
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('userId');
    this.refreshToken = localStorage.getItem('refreshToken');

    if (this.token && this.id) {
      this.wordsApiService.getUser(this.id, this.token).subscribe(
        (res) => {
          this.isLogin.emit(true);
          this.userName = res.name;
          if (res.avatar === '') {
            this.userImg = '../../../../assets/img/no-avatar.png';
          } else {
            this.userImg = res.avatar;
          }
        },
        (err: Error) => {
          this.wordsApiService.refreshTokenUser(this.id, this.refreshToken).subscribe((res) => {
            localStorage.setItem('token', this.token);
            localStorage.setItem('refreshToken', this.refreshToken);
            this.getUser();
          });
        }
      );
    }
  }

  ngOnChanges(changes): void {
    if (this.isAuthenticated) {
      this.getUser();
    }
  }

  openModal(value: boolean): void {
    this.clickAutnBtnEvent.emit(value);
  }
}
