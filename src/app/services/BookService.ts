import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:5000/api/books';

  constructor(private http: HttpClient) {}

  addBook(name: string): Observable<any> {
    return this.http.post(this.apiUrl, { name });
  }

  getBooks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
