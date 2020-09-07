import { TestBed, async, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { AppComponent, Style } from './app.component';
import { By } from '@angular/platform-browser';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        AppModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('initial content form value should be `Hello world!`', () => {
    const input = fixture.debugElement.query(By.css('mat-form-field input')).nativeElement;
    const contentContainer = fixture.debugElement.query(By.css('.content')).nativeElement;
    const initialContent = 'Hello there!';

    expect(input.value).toBe(initialContent);
    expect(contentContainer.textContent).toBe(initialContent)
  });

  it('content should be empty after clicking clear button', () => {
    const clearButton = fixture.debugElement.query(By.css('mat-form-field button')).nativeElement;
    const contentContainer = fixture.debugElement.query(By.css('.content')).nativeElement;

    clearButton.click();
    fixture.detectChanges();

    expect(component.elementContent).toBeFalsy();
    expect(contentContainer.textContent).toBe('');
  });

  it('should modify element content after edit', () => {
    const input = fixture.debugElement.query(By.css('mat-form-field input')).nativeElement;
    const contentContainer = fixture.debugElement.query(By.css('.content')).nativeElement;
    const content = 'Changed content';

    input.value = content;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.elementContent).toBe(content);
    expect(contentContainer.textContent).toBe(content);
  });

  it('`Apply style` button should be disabled when form is not filled', () => {
    const button = fixture.debugElement.query(By.css('.form-container button')).nativeElement;

    expect(button.disabled).toBeTrue();

    component.newStyleForm.patchValue({
      key: 'background-color',
    });
    fixture.detectChanges();

    expect(button.disabled).toBeTrue();
  });

  it('`Apply style` button should be enabled when form is filled', () => {
    const button = fixture.debugElement.query(By.css('.form-container button')).nativeElement;
    
    component.newStyleForm.patchValue({
      key: 'background-color',
      value: 'red',
    });
    fixture.detectChanges();

    expect(button.disabled).toBeFalse();
  });


  it('should modify style when correct values are entered', () => {
    const contentContainer = fixture.debugElement.query(By.css('.content')).nativeElement;

    addStyle(new Style('font-size', '44', 'px'));
    addStyle(new Style('background-color', 'maroon'));

    expect(contentContainer.style.fontSize).toBe('44px');
    expect(contentContainer.style.backgroundColor).toBe('maroon');
  });

  const addStyle = (newStyle: Style) => {
    const button = fixture.debugElement.query(By.css('.form-container button')).nativeElement;
    component.newStyleForm.patchValue({
      key: newStyle.key,
      value: newStyle.value,
      unit: newStyle.unit,
    });
    fixture.detectChanges();

    button.click();
    fixture.detectChanges();
  }
});
