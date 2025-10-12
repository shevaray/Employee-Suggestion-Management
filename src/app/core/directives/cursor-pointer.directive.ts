import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[cursorPointer]',
})
export class CursorPointerDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.cursor = 'pointer';
  }
}
