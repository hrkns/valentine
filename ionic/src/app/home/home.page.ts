import { Component } from '@angular/core';
import { Year } from 'src/classes/Year';
import { ApiService } from '../api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public title = 'Calendario de Vale & José';
  public year: Year;
  public days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
  public currentYear: number;
  private itIsInTheCurrentYear = true;

  constructor(
    private API: ApiService,
    private titleService: Title
  ) {}

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {

    this.titleService.setTitle(this.title);

    // get start date of work periods
    this
      .API
      .getWorkPeriodsStartDate()
      .subscribe((data: any) => {

        this.currentYear = new Date().getFullYear();
        this.year = new Year(this.currentYear, new Date(data.start_date));
        this.year.DrawWorkPeriods();
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
