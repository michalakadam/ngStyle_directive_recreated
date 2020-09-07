import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';

export class Style {
  constructor(public key = '', public value = '', public unit = '') {}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{ 

  elementContent = 'Hello there!';
  customStyles: object = {};
  newStyle = new Style();

  newStyleForm = this.formBuilder.group({
    key: ['', Validators.required],
    value: ['', Validators.required],
    unit: [''],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.newStyleForm.valueChanges.subscribe(formValues => {
      this.newStyle.key = formValues.key;
      this.newStyle.value = formValues.value;
      this.newStyle.unit = formValues.unit;
    })
  }

  onAddNewStyle(formGroup: FormGroupDirective) {
    this.customStyles = {...this.customStyles, ...this.formatNewStyle(this.newStyle)}
    this.newStyle = new Style();
    this.resetForm(formGroup);
  }

  private formatNewStyle({key, value, unit}): object {
    if (unit) {
      const keyWithUnit = key + '.' + unit;
      return {[keyWithUnit]: value};
    }
    return {[key]: value};
  }

  private resetForm(formGroup: FormGroupDirective) {
    this.newStyleForm.reset();
    formGroup.resetForm();
  }
}
