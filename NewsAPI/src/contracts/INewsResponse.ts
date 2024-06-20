import { IArticle } from "./IArticle";

interface INewsResponse {
  status: string;
  totalResults: number;
  articles: IArticle[];
}

export default INewsResponse;
