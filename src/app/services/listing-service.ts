import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarListing } from '../Interfaces/car-interface';
import { Listing } from '../Interfaces/listing-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  private baseUrl = 'http://localhost:8080/listings';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Listing[]> {
    return this.http.get<Listing[]>(this.baseUrl);
  }

  getById(id: string): Observable<Listing> {
    return this.http.get<Listing>(`${this.baseUrl}/${id}`);
  }

  create(dto: any) {
    return this.http.post(this.baseUrl, dto);
  }

  getUserListings(userId: string): Observable<Listing[]> {
    return this.http.get<Listing[]>(`${this.baseUrl}/user/${userId}`);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
