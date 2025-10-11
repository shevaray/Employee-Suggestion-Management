import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[noWrap]',
})
export class NoWrapDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.whiteSpace = 'nowrap';
  }

  ngOnInit(): void {}
}
