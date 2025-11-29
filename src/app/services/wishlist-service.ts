import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private baseUrl = 'http://localhost:8080/wishlist';
  private userId = '58e615ae-02f1-4c5f-a3af-8b9d2cf345cc'; // TODO: replace with auth

  constructor(private http: HttpClient) {}

  getWishlist(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/${this.userId}`);
  }

  add(listingId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/user/${this.userId}/listing/${listingId}`, {});
  }

  remove(listingId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/user/${this.userId}/listing/${listingId}`);
  }
}
