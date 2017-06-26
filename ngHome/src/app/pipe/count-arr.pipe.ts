// 计数管道，获得数组的元素个数
import { Pipe, PipeTransform } from '@angular/core';
/*
 * 获得一个数组元素个数
 * Usage:
 *   arr | countArr
 * Example:
 *   {{ [1, 2, 3] |  countArr}}
 *   formats to: 3
 */
@Pipe({name: 'countArr'})
export class countArrPipe implements PipeTransform {
  transform(arr): number {
    return arr.length;
  }
}
