import { Injectable } from '@angular/core';
import {CarListing} from '../Interfaces/car-interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { CarDto } from '../Interfaces/car-dto-interface';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private baseUrl = 'http://localhost:8080/cars';

  constructor(private http: HttpClient) {
  }

  getAllCars(): Observable<CarListing[]> {
    return this.http.get<CarListing[]>(this.baseUrl)
  }

  createCar(car: CarDto): Observable<CarListing> {
  return this.http.post<CarListing>(this.baseUrl, car);
}
}
