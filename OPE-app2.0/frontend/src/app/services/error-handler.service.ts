import { Injectable } from '@angular/core';

import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  public additionalValue = false;

  handleError<T>(operation = "operation", additionalValue?: any, result?: T){
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T), additionalValue;
    };
  }
}
