import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BlogInterface} from '../Interfaces/blog-interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private https: HttpClient) {}

  getBlogContent(): Observable<BlogInterface[]> {
    return this.https.get<BlogInterface[]>('http://localhost:8080/blog')
  }
}
