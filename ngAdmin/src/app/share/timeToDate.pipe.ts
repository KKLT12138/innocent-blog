/* 日期转换管道，时间戳转日期 */
import { Pipe, PipeTransform } from '@angular/core';

export class ToDatePipe implements PipeTransform {
  transform(time: number, format: number = 0): string {
    let dateStr = '';
    let date = new Date(1499930472000);
    console.log(date);
    let year = date.getFullYear() + '';
    let month = date.getMonth() + 1 + '';
    let day = date.getDate() + '';

    if (format == 0) {
      if (month.length < 2) {
        month = '0' + month;
      }
      if (day.length < 2) {
        day = '0' + day;
      }
      dateStr = `${year}-${month}-${day}`;
    }

    if (format == 1) {
      let trans = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
      trans.forEach(function (m, index) {
        if ((index + 1).toString() == month) {
          month = m;
        }
      });
      dateStr = `${month} ${day}, ${year}`;
    }

    return dateStr;
  }
}
