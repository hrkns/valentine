import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public year = {
    months : [
      {
        name : 'Enero',
        amountOfDays : 31,
        grid : [],
      },
      {
        name : 'Febrero',
        grid : [],
      },
      {
        name : 'Marzo',
        amountOfDays : 31,
        grid : [],
      },
      {
        name : 'Abril',
        amountOfDays : 30,
        grid : [],
      },
      {
        name : 'Mayo',
        amountOfDays : 31,
        grid : [],
      },
      {
        name : 'Junio',
        amountOfDays : 30,
        grid : [],
      },
      {
        name : 'Julio',
        amountOfDays : 31,
        grid : [],
      },
      {
        name : 'Agosto',
        amountOfDays : 31,
        grid : [],
      },
      {
        name : 'Septiembre',
        amountOfDays : 30,
        grid : [],
      },
      {
        name : 'Octubre',
        amountOfDays : 31,
        grid : [],
      },
      {
        name : 'Noviembre',
        amountOfDays : 30,
        grid : [],
      },
      {
        name : 'Diciembre',
        amountOfDays : 31,
        grid : [],
      },
    ]
  };
  public days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];

  constructor() {}

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {

    const year = new Date().getFullYear();
    const isThisALeapYear = ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
    let firstDayOfTheWeek = new Date(`1/1/${year}`).getDay();

    this.year.months[1].amountOfDays = 28 + Number(isThisALeapYear);

    this.year.months.forEach((month, index) => {

      month.grid = [];
      let day = 1, currentWeekDay;

      while (day <= month.amountOfDays) {

        currentWeekDay = 0;
        const week = [];

        while (currentWeekDay < firstDayOfTheWeek) {

          week.push('');
          currentWeekDay++;
        }

        while (currentWeekDay < 7 && day <= month.amountOfDays) {

          week.push(String(day++));
          currentWeekDay++;
        }

        firstDayOfTheWeek = currentWeekDay % 7;

        while (currentWeekDay++ < 7) {

          week.push('');
        }

        month.grid.push(week);
      }
    });
  }
}
