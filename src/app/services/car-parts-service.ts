import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CarPartsInterface} from '../Interfaces/car-parts-interface';

@Injectable({
  providedIn: 'root'
})
export class CarPartsService {

  constructor(private http:HttpClient) {
  }

  getAllPart(): Observable<CarPartsInterface[]> {
    return this.http.get<CarPartsInterface[]>("https://localhost:8080/parts")
  }
}
