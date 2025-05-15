// 防抖函数
export function debounce<T extends (...args: any[]) => any>(fn: T, delay = 300) {
  let timer: any = null;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}