import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CarPartsInterface} from '../Interfaces/car-parts-interface';

@Injectable({
  providedIn: 'root'
})
export class CarPartsService {
  private baseUrl = "http://localhost:8080";

  constructor(private http:HttpClient) {
  }

  getAllPart(): Observable<CarPartsInterface[]> {
    return this.http.get<CarPartsInterface[]>(`${this.baseUrl}/parts`)
  }

  addPart(part: CarPartsInterface): Observable<CarPartsInterface> {
    return this.http.post<CarPartsInterface>(`${this.baseUrl}/parts`, part);
  }

  getUserFavorites(userId: string): Observable<CarPartsInterface[]> {
    return this.http.get<CarPartsInterface[]>(`${this.baseUrl}/part-wishlist/user/${userId}`);
  }

  addToFavorites(userId: string, partId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/part-wishlist/user/${userId}/part/${partId}`, {});
  }

  removeFromFavorites(userId: string, partId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/part-wishlist/user/${userId}/part/${partId}`);
  }
}
