import { trigger, state, style, animate, transition } from '@angular/animations';

export const SlideAnimate = trigger('slide', [
  state('slideUp', style({
    'height': '0'
  })),
  state('slideDown', style({
    'height': '*'
  })),
  transition('* => *', animate(100))
]);
