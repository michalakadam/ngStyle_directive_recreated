import { Directive, ElementRef, Input, SimpleChanges, OnChanges } from '@angular/core';

@Directive({
  selector: '[customStyle]'
})
export class CustomStyleDirective implements OnChanges {  

  @Input('customStyle') style: object;

  constructor(private el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges) {
    if (Object.keys(this.style).length) {
      this.applyStyles();
    }
  }
  
  private applyStyles() {
    Object.keys(this.style).forEach(keyWithUnit => {
      const formattedKey = this.getFormattedKeyWithoutUnit(keyWithUnit);
      const unit = this.isUnitPresent(keyWithUnit) ? this.getUnit(keyWithUnit) : '';

      if (this.el.nativeElement.style[formattedKey] === undefined) {
        throw new Error(`Property ${formattedKey} does not exist on element's style object.`);
      }
      if (!this.style[keyWithUnit]) {
        throw new Error(`Property ${keyWithUnit} has no value.`);
      }

      this.el.nativeElement.style[formattedKey] = this.style[keyWithUnit] + unit;
    });
  }

  private getFormattedKeyWithoutUnit(keyWithUnit: string): string {
    return this.toCamelCase(keyWithUnit.split('.')[0].trim());
  }
  
  private toCamelCase(key: string): string {
    return key
      .toLowerCase()
      .replace(/-(.)/g, (match, firstLetterAfterDash) => {
        return firstLetterAfterDash.toUpperCase();
      });
  }

  private isUnitPresent(keyWithUnit: string): boolean {
    return keyWithUnit.includes('.');
  }

  private getUnit(keyWithUnit: string): string {
    return keyWithUnit.split('.')[1].trim();
  }
}
