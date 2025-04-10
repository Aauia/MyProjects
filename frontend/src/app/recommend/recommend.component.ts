import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service'; // Make sure to import MovieService
import { CommonModule } from '@angular/common';  // Import CommonModule
import { FormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-recommend',
  standalone: true,  // Keep the component standalone
  imports: [CommonModule, FormsModule], 
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css'],
  
})
export class RecommendComponent implements OnInit {
  movieTitles: string[] = [];
  filteredMovies: string[] = [];
  recommendedMovies: any[] = [];
  errorMessage: string = '';
  selectedMovie: string = '';
  searchTerm: string = '';

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe(
      (data) => {
        this.movieTitles = data.titles;
        this.filteredMovies = this.movieTitles; // Initialize filtered movies
      },
      (error) => {
        console.error('Error fetching movie titles', error);
        this.errorMessage = 'Failed to load movie titles.';
      }
    );
  }

  onSearch(): void {
    this.filteredMovies = this.movieTitles.filter(movie =>
      movie.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onMovieSelect(): void {
    if (this.selectedMovie) {
      this.movieService.getRecommendations(this.selectedMovie).subscribe(
        (data) => {
          this.recommendedMovies = data.recommendations || [];
        },
        (error) => {
          console.error('Error fetching recommendations', error);
          this.errorMessage = 'Movie not found or error fetching recommendations.';
        }
      );
    }
  }
}
