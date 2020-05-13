import { Component } from '@angular/core';
import { Year } from 'src/classes/Year';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public year: Year;
  public days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
  public currentYear: number;

  constructor() {}

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {

    this.year = new Year();
    this.currentYear = this.year.Year();
  }

  public decreaseYear(): void {

    this.currentYear--;
    this.year.update(this.currentYear);
  }

  public increaseYear(): void {

    this.currentYear++;
    this.year.update(this.currentYear);
  }
}
