import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {

  private _isLoading = new BehaviorSubject<boolean>(false);
  public readonly isLoading = this._isLoading.asObservable();
  constructor() { }

  show(){
    return this._isLoading.next(true);
  }
  hide(){
    return this._isLoading.next(false);
  }
}
