/**
 * 加载 public 图片
 *
 * @param {string} src
 * @returns
 * @example resolveImg('images/login/aa.jpg')
 */
export function resolveImg(src: string) {
  const baseUrl = process.env.BASE_URL
  return `${baseUrl}${src}`
}

export function mergeClass(className: any[]) {
  return className.join(' ').replace('false', '')
}
