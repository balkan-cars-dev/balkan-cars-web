import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarListing } from '../Interfaces/car-interface';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  private baseUrl = 'http://localhost:8080/listings';

  constructor(private http: HttpClient) {}

  create(dto: any) {
    return this.http.post(this.baseUrl, dto);
  }

   getUserCars(userId: string) {
    return this.http.get<CarListing[]>(`${this.baseUrl}/user/${userId}`);
  }
}
