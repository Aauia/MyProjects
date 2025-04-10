Thanks! Here's an updated version of the `README.md` overview that reflects your actual implementation — **no movie ratings**, just recommendations based on movies the user selects.

---

# Movie Recommendation Website

This is a personalized movie recommendation web application built using **Angular** for the frontend and **FastAPI** with **scikit-learn** for the backend. Users select movies they like, and the system generates recommendations based on those choices, using metadata like genres and directors.

---

## Features

- Home page displaying the latest movie releases
- Movie list where users can select movies they enjoy
- Recommendations page that suggests similar movies based on user selections
- Clean UI with smooth navigation between pages

---

## Tech Stack

- **Frontend:** Angular 15+
- **Backend:** FastAPI (Python)
- **Machine Learning:** scikit-learn
- **Similarity Algorithm:** Cosine similarity using genre and director metadata

---

## Similarity Model

The recommendation engine uses a **cosine similarity matrix** based on genres and directors of movies. This matrix is precomputed and saved in a file named `similarity.pkl`.

> **Note:** The `similarity.pkl` file is **not included** in this repository due to its large size.  
> It is available for download here:

**[Download similarity.pkl](https://drive.google.com/drive/folders/1a0bfkRdiBcwpoABwjeJD5ZA08WwK17ws?usp=share_link)**

After downloading, place it in the backend directory where FastAPI can access it.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Run the Frontend

```bash
cd frontend
npm install
ng serve
```

### 3. Run the Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## Notes

- The system does **not use explicit ratings** — recommendations are purely based on the user's selected favorite movies.
- This project demonstrates how to integrate a machine learning model into a modern Angular web application.

---
