import { CustomStyleDirective } from './custom-style.directive';
import { ElementRef, Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <div>No directive used</div>
    <div [customStyle]="{'background-color': 'red', 'color': 'green'}">Correct use</div>
    <h1 [customStyle]="{'font-size.px': '18', 'min-height.vh': '20'}">With units</h1>
  `
})
class TestComponent {}

describe('CustomStyleDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let elementsWithDirective: DebugElement[];
  let elementWithoutDirective: DebugElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        TestComponent, 
        CustomStyleDirective,
      ],
    }).createComponent(TestComponent);
    fixture.detectChanges(); // initial binding 

    elementsWithDirective = fixture.debugElement.queryAll(By.directive(CustomStyleDirective));
    elementWithoutDirective = fixture.debugElement.query(By.css('div:not([customStyle])'));
  });

  it('element with no directive should have unmodified style', () => {
    expect(elementWithoutDirective.styles.backgroundColor).toBeFalsy();
  });

  it('should change style of an element with directive', () => {
    expect(elementsWithDirective[0].styles.backgroundColor).toBe('red');
    expect(elementsWithDirective[0].styles.backgroundColor).toBe('red');
  });

  it('should change style when unit is used', () => {
    expect(elementsWithDirective[1].styles.fontSize).toBe('18px');
    expect(elementsWithDirective[1].styles.minHeight).toBe('20vh');
  })
});
