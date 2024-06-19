import Languages from "./contracts/Languages";
import { IArticle, ISource } from "./contracts/IArticle";
import { API_KEY } from "./env";

//*
const input = document.getElementById("input-field") as HTMLInputElement;
const inputValue = input.value;
const form = document.getElementById("form") as HTMLFormElement;

form.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  fetchArticles();
});

//*
const BASE_URL = "https://newsapi.org/v2/everything";
const ARTICLES_URL = `${BASE_URL}?q=*&apiKey=${API_KEY}`;

//*
function fetchArticles() {
  let allArticles: IArticle[] = [];
  fetch(ARTICLES_URL)
    .then((response: Response) => {
      if (!response.ok) {
        throw Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((articles: IArticle[]) => {
      allArticles = articles;
      displayArticles(articles);
      console.log("AllArticles:", allArticles);
    })
    .catch();
}

fetchArticles();

function displayArticles(articles: IArticle[]) {
  console.log("Hello");
}

function filterArticlesByPopularity() {}
function filterArticlesByLanguage() {}
function filterArticlesByRelevancy() {}
function filterNewestArticle() {}
