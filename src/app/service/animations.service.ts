import { Injectable } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {

  constructor() { }
}

export const shakeAnimation = trigger('shake', [
  state('start', style({
    transform: 'translateX(0)'
  })),
  transition('* => shake', [
    animate('0.1s', style({
      transform: 'translateX(-2%)'
    })),
    animate('0.1s', style({
      transform: 'translateX(2%)'
    })),
    animate('0.1s', style({
      transform: 'translateX(-2%)'
    })),
    animate('0.1s', style({
      transform: 'translateX(2%)'
    })),
    animate('0.1s', style({
      transform: 'translateX(-2%)'
    })),
    animate('0.1s', style({
      transform: 'translateX(0)'
    }))
  ])
]);