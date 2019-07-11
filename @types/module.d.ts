// declare module 'koa-ejs' {
//   import Koa from 'koa'
//   interface RenderParame {
//     root: string;
//     /** layout: global layout file, default is layout, set false to disable layout. */
//     layout?: string;
//     /** viewExt: view file extension (default html). */
//     viewExt?: string;
//     /** cache: cache compiled templates (default true). */
//     cache?: boolean;
//     /** debug: debug flag (default false). */
//     debug?: boolean;
//     /** delimiter: character to use with angle brackets for open / close (default %). */
//     delimiter?: string;
//   }

//   function render(app: Koa, parame: RenderParame): void
//   export = render
// }

// declare class Application {
//   interface Context {
//     render(viewPath: string, locals?: any): Promise<void>;
//   }
// }

// import * as Koa from 'koa'

// declare namespace Application {
//   interface Context {
//     render(viewPath: string, locals?: any): Promise<void>;
//   }
// }
// declare interface ContextDelegatedResponse {
//   render(viewPath: string, locals?: any): Promise<void>;
// }
