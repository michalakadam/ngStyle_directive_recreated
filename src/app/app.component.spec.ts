import { TestBed, async, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
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
  })
});
