import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequest = 0;

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.method === 'GET') {
      this.totalRequest += this.totalRequest;
      this.loadingService.setLoading(false);
    }
    return next.handle(request).pipe(
      finalize((): void => {
        this.totalRequest -= this.totalRequest;
        if (!this.totalRequest) this.loadingService.setLoading(true);
      })
    );
  }
}
