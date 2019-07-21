import mongoose from 'mongoose';
import { query } from '../';

interface postSchemaMethods {
  // findAll: typeof findAll;
}

/**
 * 定义表模式（结构）
 */
const postSchema = new mongoose.Schema<postSchemaMethods>({
  _id: mongoose.Schema.Types.ObjectId,
  link: String,
  title: String,
  date: String,
  src: String,
  content: String,
  tages: [
    { name: String, link: String },
  ],
})

interface ResponseQueryPostType {
  _id: string;
  link: string;
  title: string;
  date: string;
  src: string;
  content: string;
  tages: Array<{ name: string, link: string }>,
}

export namespace modelPost {
  export const model = mongoose.model('post', postSchema, 'blog_post');

  /**
   * 查询 Post
   */
  export function queryPost() {
    return query<ResponseQueryPostType[]>(model);
  }
}
