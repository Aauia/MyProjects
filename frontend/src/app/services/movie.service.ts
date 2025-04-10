import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Movie {
  title: string;
  poster: string;
}
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = 'http://localhost:8000';  // Backend URL (FastAPI)

  constructor(private http: HttpClient) { }

  getMovies(): Observable<any> {
    console.log('Sending request to get movies...');
    return this.http.get(`${this.apiUrl}/movies`);
  }
  
  getRecommendations(movieName: string): Observable<any> {
    console.log(`Sending request to get recommendations for ${movieName}...`);
    return this.http.get(`${this.apiUrl}/recommend/${movieName}`);
  }
  
}

