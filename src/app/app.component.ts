import { Component, OnChanges, SimpleChanges } from '@angular/core';

class Style {
  
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { 

  elementContent = 'Hello there!';
  customStyles: object = {};

}
