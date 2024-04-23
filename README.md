<h1 align="center">
  <br>
  Nobly Harsh Reviews 🎬
  <br>
</h1>

<h4 align="center">A Svelte Exercise.</h4>


## General Introduction

Welcome to **Nobly Harsh Reviews**, the digital redoubt where Sir Reginald Pique, armed with his relentless wit and unwavering standards, dispenses his cinema critiques. This application, crafted with the elegance of Svelte 5 preview and styled by the sophisticated simplicity of Tailwind CSS, brings a cinematic critique experience like no other. Using Redis from Upstash for persistent storage, the TMDB API for fetching extensive movie details, and ChatGPT to channel the ineffable essence of Sir Reginald Pique (whose existence remains as mysterious as a well-crafted plot twist), this project is a technophile's delight wrapped in a critic’s robe.

## Requirements

Before you embark on this noble quest of film criticism, ensure you have the following installed:

- **NPM**: Essential for managing the packages that Sir Reginald would deign to acknowledge.

You will also need these tokens / API keys, securely tucked in your environment:

```bash
# Redis connection (because even Sir Reginald appreciates a good cache)
# https://upstash.com/docs/redis/howto/connectwithupstashredis
REDIS_TOKEN=<upstash redis token>
# TMDB for when Sir Reginald needs to fact-check his disdain
# https://developer.themoviedb.org/reference/intro/getting-started
TMDB_TOKEN=<tmdb token>
# OpenAI because sometimes, even Sir Reginald needs a prompt
# https://platform.openai.com
OPENAI_API_KEY=<openai api key>
```

## Run

To breathe life into Sir Reginald’s digital abode:

```bash
npm run dev
```

To host this bastion of critiques, use a platform like Vercel. Currently deployed for your skeptical perusal at https://test.com.

## Pages / Features

* **Home Page `/`:** 
  
  An introduction to the app, featuring Sir Reginald Pique’s latest critiques.
  
* **Login & Registration Page `/login`:** 
  
  Engage more personally with Sir Reginald's world. Register to curate collections of your favourite films (and critiques). Use the demo account test@local.com with the password "test" for a sneak peek.
  
* **Search Page `/search/{query}/{page}`:** 
  
  Delve into the extensive catalog with a film title as your query. Discover films worthy of Sir Reginald’s attention—or scorn.
  
* **Film / Critiques Page `/film/{id}`:** 
  
  Peruse the film overview and Sir Reginald’s illustrious critique. If logged in, you may also favourite films to easily access them later.
  
* **Favourites Page `/favourites/{page}`:** 
  
  View a list of all your favorited films. A haven accessible only to the logged-in elite.
  
* **Dark Mode Support:** 
  
  Read critiques in the dark, sparing your eyes from the glaring truth of Sir Reginald's words.
  
* **Responsive Design:** 

  Whether on mobile or desktop, the experience remains as refined as Sir Reginald’s taste in film.

Embrace the sharp insights and scathing wit of Sir Reginald Pique as you explore Nobly Harsh Reviews. May your films be worthy and your critiques ever harsh!