import Languages from "./contracts/Languages";
import { IArticle, ISource } from "./contracts/IArticle";
import { API_KEY } from "./env";

//*
const input = document.getElementById("input-field") as HTMLInputElement;

const form = document.getElementById("form") as HTMLFormElement;

form.addEventListener("submit", (event: Event) => {
  event.preventDefault();

  fetchArticles();
  console.log("Submitted");
});

//*
// const BASE_URL = "https://newsapi.org/v2/everything";
// const QUESTION = `?q=${inputValue}`;
// const ARTICLES_URL = `${BASE_URL}${QUESTION}&from=2024-06-08&to=2024-06-18&apiKey=${API_KEY}`;

function buildFetchUrl() {
  const inputValue = input.value;
  const BASE_URL = "https://newsapi.org/v2/everything";
  const QUESTION = `?q=${inputValue}`;
  const ARTICLES_URL = `${BASE_URL}${QUESTION}&from=2024-06-08&to=2024-06-18&apiKey=${API_KEY}`;
  return ARTICLES_URL;
}

//*
function fetchArticles() {
  let allArticles: IArticle[] = [];
  buildFetchUrl();
  fetch(buildFetchUrl())
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

function displayArticles(allArticles: IArticle[]) {
  const articleObject = Object.values(allArticles);
  console.log("1.Durchgang", articleObject);
  const articleObjectSecondLevel = articleObject[2];
  const test = Object.values(articleObjectSecondLevel);
  // const articleObjectSecondLevel = articleObject.slice()
  console.log("2.Durchgang", articleObjectSecondLevel);

  const output = document.getElementById("output");
  if (output) {
    let articlesMap = test.map((article: IArticle) => {
      return `
    <div class="card">
    <div class="img-wrapper">
    <img  src="${article.urlToImage}" alt="bild">
    </div>
 <h2>${article.title}</h2>
 <p id=description-paragraph">${article.description}</p>
 <div class="author-wrapper">
 <p id=author-paragraph">${article.author}</p>
 <p id=published-paragraph">${article.publishedAt}</p>
 </div>
 <a href='${article.url}'target="blank">
<button id="card-btn" >Read more</button>
</a>
    </div>
      
    `;
    });
    output.innerHTML = articlesMap.toString();
  }
}
function filterArticlesByPopularity() {}
function filterArticlesByLanguage() {}
function filterArticlesByRelevancy() {}
function filterNewestArticle() {}
