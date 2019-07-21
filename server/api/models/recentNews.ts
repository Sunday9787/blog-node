import mongoose from 'mongoose';
import { query } from '../';

interface recentNewsSchemaMethods {
  // findAll: typeof findAll;
}

const recentNewsSchema = new mongoose.Schema<recentNewsSchemaMethods>({
  _id: mongoose.Schema.Types.ObjectId,
  link: String,
  name: String,
  src: String,
})

interface ResponseQueryRecentNewsType {
  _id: string;
  link: string;
  name: string;
  src: string;
}



export namespace modelRecentNews {
  export const model = mongoose.model('recentNews', recentNewsSchema, 'blog_recentnews');
  /**
   * 查询精选文章
   */
  export function queryRecentNews() {
    return query<ResponseQueryRecentNewsType[]>(model);
  }
}
