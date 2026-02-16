import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('token');

  // if no token → send request normally
  if (!token) {
    return next(req);
  }

  // clone request and attach token
  const authReq = req.clone({

    setHeaders: {
      Authorization: `Bearer ${token}`
    }

  });

  return next(authReq);

};
