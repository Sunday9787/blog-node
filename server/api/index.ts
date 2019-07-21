import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  dbName: 'blog',
  user: 'root',
  pass: '123456',
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
