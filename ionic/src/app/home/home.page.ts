import { Component } from '@angular/core';
import { Year } from 'src/classes/Year';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public year: Year;
  public days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
  public currentYear: number;

  constructor(
    private API: ApiService
  ) {}

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {

    this.year = new Year();
    this.currentYear = this.year.Year();

    // get start date of work periods
    this
      .API
      .getWorkPeriodsStartDate()
      .subscribe((data: any) => {

        this.year.StartDateWorkPeriods(new Date(data.start_date));
      }, error => {

        console.log('error', error);
      });
  }

  public decreaseYear(): void {

    if (new Date().getFullYear() < this.currentYear) {

      this.currentYear--;
      this.year.update(this.currentYear);
    }
  }

  public increaseYear(): void {

    this.currentYear++;
    this.year.update(this.currentYear);
  }
}
