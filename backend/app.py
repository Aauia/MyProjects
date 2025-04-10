from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any
import pickle
import pandas as pd
import requests

app = FastAPI()

# Enable CORS for Angular frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # Restrict it to Angular app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load model data
with open('model/movie_list.pkl', 'rb') as f:
    movies = pickle.load(f)

with open('model/similarity.pkl', 'rb') as f:
    similarity = pickle.load(f)

def fetch_poster(movie_id: int) -> str:
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US"
    data = requests.get(url).json()
    poster_path = data.get('poster_path')
    return f"https://image.tmdb.org/t/p/w500/{poster_path}" if poster_path else ""

@app.get("/movies")
def get_movies() -> Dict[str, List[str]]:
    return {"titles": movies['title'].tolist()}  # Ensure 'movies' is a pandas DataFrame or similar


@app.get("/recommend/{movie_name}")
def recommend(movie_name: str) -> Dict[str, Any]:
    try:
        index = movies[movies['title'] == movie_name].index[0]
    except IndexError:
        return {"error": "Movie not found"}
    
    distances = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])
    recommended = []
    for i in distances[1:6]:
        movie_id = movies.iloc[i[0]].movie_id
        title = movies.iloc[i[0]].title
        poster = fetch_poster(movie_id)
        recommended.append({"title": title, "poster": poster})
    
    return {"recommendations": recommended}
