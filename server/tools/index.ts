export function mergeClass(className: (string | boolean)[]) {
  return className.join(' ').replace('false', '');
}

type Types = 'bigint' | 'boolean' | 'function' | 'number' | 'object' | 'string' | 'symbol' | 'undefined' | 'array'

export function is(type: Types, obj: any) {
  return typeof Object.prototype.toString.call(obj).toLowerCase() === `[object ${type}]`
}

interface URLType {
  toHome?: boolean
  /**
   * @example
   * `/page/$pager`
   * `/categor/hexo/page?=$pager`
   */
  base: string
}

export interface PaginationConfig {
  total: number
  current: number
  pageSize?: number
  perPages?: number
  baseURL: URLType | string
}

export class Pagination {
  /**
   * 当前页码
   */
  public current: number
  /**
   *总记录数
   */
  public total: number
  /**
   * 每页显示条数
   */
  public pageSize: number

  /**
   * 页面中隐藏的页码 最大数量
   * 左右分别计算
   */
  public perPages: number

  /**
   * 分页跳转的url路径
   */
  public baseURL: URLType | string

  constructor({ total, current, baseURL, pageSize = 10, perPages = 5 }: PaginationConfig) {
    this.total = total
    this.current = current
    this.pageSize = pageSize
    this.perPages = perPages
    this.baseURL = baseURL
  }

  get total_page() {
    return Math.ceil(this.total / this.pageSize);
  }

  get showPrevMore() {
    return (this.current - this.perPages > 1)
  }

  get showNextMore() {
    return (this.total_page - this.perPages > this.current)
  }

  get pagers() {
    let left = 0;
    let right = 0;
    const result: number[] = [];

    if (this.current - this.perPages > 1) {
      left = this.current - this.perPages;
    } else {
      left = 2;
    }

    if (this.total_page - this.perPages > this.current) {
      right = this.total_page - this.perPages;
    } else {
      right = this.total_page - 1
    }

    while (left <= right) {
      result.push(left);
      left++;
    }
    return result;
  }

  get prevPage() {
    if (this.current === 1) {
      return 'javascript:;';
    }

    if (this.current === 2) {
      if (typeof this.baseURL === 'object' && this.baseURL.toHome) {
        return '/'
      }
      return this.transformURL(this.current)
    }

    return this.transformURL(this.current - 1)
  }

  get nextPage() {
    if (this.current === this.total_page) {
      return 'javascript:;'
    }
    return this.transformURL(this.current + 1)
  }

  public transformURL(pager: number) {
    if (typeof this.baseURL === 'object') {
      if (pager === 1 && this.baseURL.toHome ) {
        return '/'
      }
      return this.baseURL.base.replace(/\$pager/ig, String(pager))
    }
    return this.baseURL.replace(/\$pager/ig, String(pager))
  }

  public render() {
    const template = `<div id="page-nav" class="pag">
      <a class="${mergeClass(['page-item', 'page-prev', (this.current === 1 && 'page-item--disabled')])}" rel="prev" href="${this.prevPage}">上一页</a>

      <a class="${mergeClass(['page-item', this.current === 1 && 'page-item--current'])}" href="${this.transformURL(1)}">1</a>

      ${this.showPrevMore ? '<span class="page-item page-item--more">...</span>' : ''}

      ${
        this.pagers.map((pager) => {
          return `<a class="${mergeClass(['page-item', this.current === pager && 'page-item--current'])}" href="${this.transformURL(pager)}">${pager}</a>`
        }).join('')
      }

      ${this.showNextMore ? '<span class="page-item page-item--more"}>...</span>' : ''}

      <a class="${mergeClass(['page-item', this.current === this.total_page && 'page-item--current'])}" href="${this.transformURL(this.total_page)}">${this.total_page}</a>

      <a class="${mergeClass(['page-item', 'page-next', this.current === this.total_page && 'page-item--disabled'])}" rel="next" href="${this.nextPage}">下一页</a>
    </div>`
    return template
  }
}
