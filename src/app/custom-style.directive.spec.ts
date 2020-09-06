import { CustomStyleDirective } from './custom-style.directive';
import { ElementRef, Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <div>No directive used</div>
    <div [customStyle]="{'background-color': 'red', 'color': 'green'}">Correct use</div>
  `
})
class TestComponent {}

describe('CustomStyleDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let elementsWithDirective: DebugElement;
  let elementWithoutDirective: DebugElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        TestComponent, 
        CustomStyleDirective,
      ],
    }).createComponent(TestComponent);
    fixture.detectChanges(); // initial binding 

    elementsWithDirective = fixture.debugElement.query(By.directive(CustomStyleDirective));
    elementWithoutDirective = fixture.debugElement.query(By.css('div:not([customStyle])'));
  });

  it('element with no directive should have unmodified style', () => {
    expect(elementWithoutDirective.styles.backgroundColor).toBeFalsy();
  });

  it('should change style of an element with directive', () => {
    expect(elementsWithDirective.styles.backgroundColor).toBe('red');
    expect(elementsWithDirective.styles.color).toBe('green');
  });
});
