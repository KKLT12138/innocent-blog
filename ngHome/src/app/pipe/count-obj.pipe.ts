// 计数管道，获得对象的属性个数
import { Pipe, PipeTransform } from '@angular/core';
/*
 * 获得一个对象的属性个数
 * Usage:
 *   obj | countObj
 * Example:
 *   {{ {name: "Tom"} |  countObj}}
 *   formats to: 1
 */
@Pipe({name: 'countObj'})
export class countObjPipe implements PipeTransform {
  transform(obj: object): number {
    return Object.getOwnPropertyNames(obj).length;
  }
}
