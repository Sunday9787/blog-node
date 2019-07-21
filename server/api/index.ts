import mongoose from 'mongoose';
import { mongodb } from '../config';

mongoose.connect(mongodb.url, {
  useNewUrlParser: true,
  dbName: mongodb.dbName,
  user: mongodb.user,
  pass: mongodb.pass,
});

export function query<T>(model: mongoose.Model<mongoose.Document, {}>): Promise<T> {
  return new Promise((resolve, reject) => {
    model.find((err, doc: T) => {
      if (err) {
        reject(err);
        return
      }
      resolve(doc);
    })
  })
}

/**
 * 首页数据
 */
export * from './models/categor';
export * from './models/recentNews';
export * from './models/tag';
export * from './models/post';
