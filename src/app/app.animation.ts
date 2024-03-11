import {
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';

export const slideInAnimation =  trigger('slideInAnimation', [
  transition('void => left', [
    style({ transform: 'translateX(100%)' }), // Start off-screen to the right
    animate('500ms ease-in', style({ transform: 'translateX(0%)' })), // Slide in from right
  ]),
  transition('left => void', [
    animate('500ms ease-out', style({ transform: 'translateX(-100%)' })), // Slide out to the left
  ]),
  transition('void => right', [
    style({ transform: 'translateX(-100%)' }), // Start off-screen to the left
    animate('500ms ease-in', style({ transform: 'translateX(0%)' })), // Slide in from left
  ]),
  transition('right => void', [
    animate('500ms ease-out', style({ transform: 'translateX(100%)' })), // Slide out to the right
  ]),
]);