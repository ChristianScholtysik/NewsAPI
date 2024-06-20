import { IArticle } from "./contracts/IArticle";
import { API_KEY } from "./env";
import Category from "./contracts/Categories";
import INewsResponse from "./contracts/INewsResponse";

//*
const input = document.getElementById("input-field") as HTMLInputElement;
const filter = document.getElementById("filter-select") as HTMLSelectElement;
const languageFilter = document.getElementById(
  "language-select"
) as HTMLSelectElement;
const form = document.getElementById("form") as HTMLFormElement;
form.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  fetchArticles();
});

//*

function buildFetchUrlForFilter() {
  const inputValue = input.value;
  console.log("input value2filterfetch: ", inputValue);
  const BASE_URL = "https://newsapi.org/v2/everything";
  const QUESTION = `?q=${inputValue}`;
  const language = languageFilter.value;
  const LANGUAGE = language === "0" ? "" : `&language=${language}`;
  const popularity = filter.value;
  const POPULARITY = popularity === "0" ? "" : `&sortBy=${popularity}`;
  const ARTICLESFILTER_URL = `${BASE_URL}${QUESTION}&from=2024-06-08&to=2024-06-18${LANGUAGE}${POPULARITY}&apiKey=${API_KEY}`;
  return ARTICLESFILTER_URL;
}

//*
function fetchArticles() {
  console.log("fetchArticles");
  let allArticles: IArticle[] = [];

  fetch(buildFetchUrlForFilter())
    .then((response: Response) => {
      if (!response.ok) {
        throw Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((newsResponse: INewsResponse) => {
      return newsResponse.articles;
    })
    .then((articles: IArticle[]) => {
      allArticles = articles;
      displayArticles(articles);
      console.log("AllArticles:", allArticles);
    })
    .catch((error: Error) => {
      console.error(error);
      const output = document.getElementById("output");
      if (output) {
        let errorCard = `<div class="errorCard-wrapper"><div class="errorCard">Not possible! A minimum of one searchparameter is required</div></div>`;
        output.innerHTML = errorCard;
        return ` output.innerHTML= errorCard `;
      }
    });
}

function displayArticles(allArticles: IArticle[]) {
  const output = document.getElementById("output");
  if (output) {
    if (allArticles.length) {
      let articlesMap = allArticles.map((article: IArticle) => {
        const imageUrl =
          article.urlToImage ??
          "../src/assets/img/elementor-placeholder-image.png";

        const teaserText = article.description ?? " ";

        return `
    <div class="card">
    <div class="img-wrapper">
     <img  src='${imageUrl}' alt="NewsImage">
    </div>
 <h2>${article.title}</h2>
 <p id=description-paragraph">${teaserText}</p>
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
    } else {
      console.error("No matches found");
      output.innerHTML =
        '<div class="errorCard-wrapper"><div class="errorCard">No matches found, Please try again!</div></div>';
    }
  }
}

//* Filter by category

const categories = [
  Category.Business,
  Category.Entertainment,
  Category.General,
  Category.Health,
  Category.Science,
  Category.Sports,
  Category.Technology,
];

function createCategoryButtons() {
  const buttonField = document.getElementById("category-button-field");
  if (buttonField) {
    categories.forEach((category: Category) => {
      const categoryButton = document.createElement("Button");
      categoryButton.className = "category-btn";
      categoryButton.innerHTML = `${category.toUpperCase()}`; //TODO: UPPERCASE
      buttonField.appendChild(categoryButton);
      //* Event Listener
      categoryButton.addEventListener("click", (event: Event) => {
        console.log("clicked");
        event.preventDefault();
        fetchTopHeadlinesByCategory(category);
      });
    });
  }
}

function createCategoryURL(category: Category) {
  const BASE_URL = "https://newsapi.org/v2/top-headlines";
  const CATEGORY = `category=${category}`;
  const ARTICLESFILTERCATEGORY_URL = `${BASE_URL}?${CATEGORY}&apiKey=${API_KEY}`;
  console.log(ARTICLESFILTERCATEGORY_URL);
  return ARTICLESFILTERCATEGORY_URL;
}

function fetchTopHeadlinesByCategory(category: Category) {
  console.log("fetchTOPArticles");
  let allArticles: IArticle[] = [];
  fetch(createCategoryURL(category))
    .then((response: Response) => {
      if (!response.ok) {
        throw Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((newsResponse: INewsResponse) => {
      return newsResponse.articles;
    })
    .then((articles: IArticle[]) => {
      allArticles = articles;

      displayArticles(articles);
      console.log("AllArticles:", allArticles);
    })
    .catch((error: Error) => {
      console.error(error);
      const output = document.getElementById("output");
      if (output) {
        let errorCard = `<div class="ErrorCard">FEHLER</div>`;
        output.innerHTML = errorCard;
        return ` output.innerHTML= errorCard `;
      }
    });
}

createCategoryButtons();
