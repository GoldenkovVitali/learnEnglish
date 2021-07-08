import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

interface Optional {
  date: number;
  repeat: number;
  delete: boolean;
  optionalField?: string | null;
  isDeleted?: boolean;
}
interface Word {
  id?: string | null;
  word?: string | null;
  image?: string | null;
  audio?: string | null;
  audioMeaning?: string | null;
  group?: number | null;
  page?: number | null;
  audioExample?: string | null;
  textMeaning?: string | null;
  textExample?: string | null;
  transcription?: string | null;
  wordTranslate?: string | null;
  textMeaningTranslate?: string | null;
  textExampleTranslate?: string | null;
  wordsPerExampleSentence?: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class WordsApiService {
  private apiUrl = 'https://quiet-fortress-68618.herokuapp.com/';

  id: string | null;

  page: number | null;

  group: number | null;

  userName: string | null;

  email: string | null;

  password: string | null;

  token: string | null;

  wordId: string | null;

  wordDifficulty: string | null;

  optional: Optional | null;

  wordsPerDay: number | null;

  learnedWords: number | null;

  refreshToken: string | null;

  avatar: File;

  public static setUserId(id: string | null): void {
    localStorage.setItem('userId', id);
  }

  public static getUserId(): void {
    localStorage.getItem('userId');
  }

  public static setUserToken(token: string | null): void {
    localStorage.setItem('token', token);
  }

  public getUserToken(): string {
    return localStorage.getItem('token');
  }

  public static setUserRefreshToken(refreshToken: string | null): void {
    localStorage.setItem('refreshToken', refreshToken);
  }

  public static getUserRefreshToken(): void {
    localStorage.getItem('refreshToken');
  }

  public static setUserName(userName: string | null): void {
    localStorage.setItem('userName', userName);
  }

  public static getUserName(): void {
    localStorage.getItem('userName');
  }

  public static setUserEmail(userEmail: string | null): void {
    localStorage.setItem('userEmail', userEmail);
  }

  public static getUserEmail(): void {
    localStorage.getItem('userEmail');
  }

  public static setUserAuthorized(authorized: string | null): void {
    localStorage.setItem('authorized', authorized);
  }

  public static getUserAuthorized(): void {
    localStorage.getItem('authorized');
  }

  constructor(private httpClient: HttpClient) {}

  public getWordById(wordId: string | null): Observable<Word> {
    this.wordId = wordId;
    return this.httpClient.get<Word>(`${this.apiUrl}words/${this.wordId}`);
  }

  public getWordsByPageAndGroup(page: number | null, group: number | null): Observable<any> {
    this.page = page;
    this.group = group;
    return this.httpClient.get<any>(`${this.apiUrl}words?page=${page}&group=${group}`);
  }

  public createUser(
    userName: string | null,
    email: string | null,
    password: string | null,
    avatar: File
  ): Observable<any> {
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.avatar = avatar;
    const data = new FormData();
    data.append('avatar', avatar);
    data.append('name', userName);
    data.append('email', email);
    data.append('password', password);
    return this.httpClient.post<any>(`${this.apiUrl}users`, data);
  }

  public getUser(id: string | null, token: string | null): Observable<any> {
    this.id = id;
    this.token = token;
    return this.httpClient.get<any>(`${this.apiUrl}users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  public updateUser(
    id: string | null,
    token: string | null,
    userName: string | null,
    email: string | null,
    password: string | null,
    avatar: File
  ): Observable<any> {
    this.id = id;
    this.token = token;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.avatar = avatar;
    const data = new FormData();
    data.append('_id', id);
    data.append('avatar', avatar);
    data.append('name', userName);
    data.append('email', email);
    data.append('password', password);
    return this.httpClient.put<any>(`${this.apiUrl}users/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  public deleteUser(id: string | null, token: string | null): Observable<any> {
    this.id = id;
    this.token = token;
    return this.httpClient.delete<any>(`${this.apiUrl}users/${id}`, {
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  public createUserWord(
    id: string | null,
    wordId: string | null,
    token: string | null,
    wordDifficulty: string | null,
    optional: Optional | null
  ): Observable<any> {
    this.id = id;
    this.wordId = wordId;
    this.token = token;
    this.wordDifficulty = wordDifficulty;
    this.optional = optional;
    const data = {
      difficulty: `${wordDifficulty}`,
      optional,
    };
    return this.httpClient.post<any>(`${this.apiUrl}users/${id}/words/${wordId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  public getAllUsersWords(id: string | null, token: string | null): Observable<any> {
    this.id = id;
    this.token = token;
    return this.httpClient.get<any>(`${this.apiUrl}users/${id}/words`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
  }

  public getUserWordById(
    id: string | null,
    wordId: string | null,
    token: string | null
  ): Observable<any> {
    this.id = id;
    this.wordId = wordId;
    this.token = token;
    return this.httpClient.get<any>(`${this.apiUrl}users/${id}/words/${wordId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
  }

  public updateUserWord(
    id: string | null,
    wordId: string | null,
    token: string | null,
    wordDifficulty: string | null,
    optional: Optional | null
  ): Observable<any> {
    this.id = id;
    this.wordId = wordId;
    this.token = token;
    this.wordDifficulty = wordDifficulty;
    this.optional = optional;
    const data = {
      difficulty: `${wordDifficulty}`,
      optional,
    };
    return this.httpClient.put<any>(`${this.apiUrl}users/${id}/words/${wordId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  public deleteUserWord(
    id: string | null,
    wordId: string | null,
    token: string | null
  ): Observable<any> {
    this.id = id;
    this.wordId = wordId;
    this.token = token;
    return this.httpClient.delete<any>(`${this.apiUrl}users/${id}/words/${wordId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: '*/*',
      },
    });
  }

  public getUserSettings(id: string | null, token: string | null): Observable<any> {
    this.id = id;
    this.token = token;
    return this.httpClient.get<any>(`${this.apiUrl}users/${id}/settings`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
  }

  public setUserSettings(
    id: string | null,
    token: string | null,
    wordsPerDay: number | null,
    optional: Optional | null
  ): Observable<any> {
    this.id = id;
    this.token = token;
    this.wordsPerDay = wordsPerDay;
    this.optional = optional;
    const data = {
      wordsPerDay,
      optional,
    };
    return this.httpClient.put<any>(`${this.apiUrl}users/${id}/settings`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  public getUserStatistic(id: string | null, token: string | null): Observable<any> {
    this.id = id;
    this.token = token;
    return this.httpClient.get<any>(`${this.apiUrl}users/${id}/statistics`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
  }

  public setUserStatistic(
    id: string | null,
    token: string | null,
    learnedWords: number | null,
    optional: Optional | null
  ): Observable<any> {
    this.id = id;
    this.token = token;
    this.learnedWords = learnedWords;
    this.optional = optional;
    const data = {
      learnedWords,
      optional,
    };
    return this.httpClient.put<any>(`${this.apiUrl}users/${id}/statistics`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  public signIn(email: string | null, password: string | null): Observable<any> {
    this.email = email;
    this.password = password;
    const data = {
      email,
      password,
    };
    return this.httpClient.post<any>(`${this.apiUrl}signin`, data, {
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    });
  }

  public refreshTokenUser(id: string | null, refreshToken: string | null): Observable<any> {
    this.id = id;
    this.refreshToken = refreshToken;
    return this.httpClient.get<any>(`${this.apiUrl}users/${id}/tokens`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        Accept: 'application/json',
      },
    });
  }
}
