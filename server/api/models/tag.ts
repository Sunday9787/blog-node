import mongoose from 'mongoose';
import { query } from '../';

interface categorSchemaMethods {
  // findAll: typeof findAll;
}

const tagSchema = new mongoose.Schema<categorSchemaMethods>({
  _id: mongoose.Schema.Types.ObjectId,
  link: String,
  name: String,
})

interface ResponseQueryTagType {
  _id: string;
  link: string;
  name: string;
}

export namespace modelTag {
  export const model = mongoose.model('tag', tagSchema, 'blog_tag');

  /**
   * 查询 tag
   */
  export function queryTag() {
    return query<ResponseQueryTagType[]>(model);
  }
}
