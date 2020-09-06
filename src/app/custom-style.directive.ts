import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[customStyle]'
})
export class CustomStyleDirective implements AfterViewInit {  

  @Input('customStyle') style: object;

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    if (Object.keys(this.style).length) {
      this.applyStyles();
    }
  }
  
  private applyStyles() {
    Object.keys(this.style).forEach(key => {
      const keyInCamelCase = this.toCamelCase(key); 
      if (this.el.nativeElement.style[keyInCamelCase] === undefined) {
        throw new Error(`Property ${key} does not exist on element's style object.`);
      }
      if (!this.style[key]) {
        throw new Error(`Property ${key} has no value.`);
      }
      this.el.nativeElement.style[keyInCamelCase] = this.style[key];
    });
  }
  
  private toCamelCase(key: string): string {
    return key
      .toLowerCase()
      .replace(/-(.)/g, (match, firstLetterAfterDash) => {
        return firstLetterAfterDash.toUpperCase();
      });
  }
}
