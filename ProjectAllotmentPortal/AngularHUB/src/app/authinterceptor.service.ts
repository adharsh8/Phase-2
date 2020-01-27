import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'; 


@Injectable({
  providedIn: 'root'
})
export class AuthinterceptorService implements HttpInterceptor {

  constructor(public auth: AuthinterceptorService,private router:Router) { }

  public getToken(): string {
    return localStorage.getItem('userToken');
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: {
        Authorization: `bearer ${this.auth.getToken()}`
      }
     
    });

    return next.handle(request).pipe(catchError(x=> this.handleAuthError(x)));
  }
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
  
    if (err.status === 401 || err.status === 403) {
      
        this.router.navigate(['login']);
    
        return of(err.message); 
    }
    return throwError(err);
}
}
