import mongoose from 'mongoose';
import { query } from '../';

interface categorSchemaMethods {
  // findAll: typeof findAll;
}

const categorSchema = new mongoose.Schema<categorSchemaMethods>({
  _id: mongoose.Schema.Types.ObjectId,
  link: { type: String },
  name: { type: String },
  total: { type: Number },
})

interface ResponseQueryCategorType {
  _id: string;
  link: string;
  name: string;
  total: number;
}

export namespace modelCategor {
  export const model = mongoose.model('categor', categorSchema, 'blog_categor');

  /**
   * 查询 分类
   */
  export function queryCategor() {
    return query<ResponseQueryCategorType[]>(model);
  }
}
