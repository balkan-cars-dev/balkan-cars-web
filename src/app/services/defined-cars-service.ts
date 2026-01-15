import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface DefinedCar {
  id: string;
  brand: string;
}

@Injectable({
  providedIn: 'root'
})
export class DefinedCarsService {
  private baseUrl = 'http://localhost:8080/definedCars';

  constructor(private http: HttpClient) {}

  getAllDefinedCars(): Observable<DefinedCar[]> {
    return this.http.get<DefinedCar[]>(this.baseUrl);
  }

  getBrands(): Observable<string[]> {
    return this.getAllDefinedCars().pipe(
      map(cars => cars.map(car => car.brand).sort())
    );
  }
}
