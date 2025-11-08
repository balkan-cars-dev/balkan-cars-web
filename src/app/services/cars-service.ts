import { Injectable } from '@angular/core';
import {CarListing} from '../Interfaces/car-interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http: HttpClient) {
  }

  getAllCars(): Observable<CarListing[]> {
    return this.http.get<CarListing[]>('http://localhost:8080/cars')
  }
}
