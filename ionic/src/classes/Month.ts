import {Day} from './Day';

export const MonthsData = {
  JANUARY : {
    name : 'Enero',
    number : 1,
    amountOfDays : 31,
  },
  FEBRUARY : {
    name : 'Febrero',
    number : 2,
    amountOfDays : 28,
  },
  MARCH : {
    name : 'Marzo',
    number : 3,
    amountOfDays : 31,
  },
  APRIL : {
    name : 'Abril',
    number : 4,
    amountOfDays : 30,
  },
  MAY : {
    name : 'Mayo',
    number : 5,
    amountOfDays : 31,
  },
  JUNE : {
    name : 'Junio',
    number : 6,
    amountOfDays : 30,
  },
  JULY : {
    name : 'Julio',
    number : 7,
    amountOfDays : 31,
  },
  AUGUST : {
    name : 'Agosto',
    number : 8,
    amountOfDays : 31,
  },
  SEPTEMBER : {
    name : 'Septiembre',
    number : 9,
    amountOfDays : 30,
  },
  OCTOBER : {
    name : 'Octubre',
    number : 10,
    amountOfDays : 31,
  },
  NOVEMBER : {
    name : 'Noviembre',
    number : 11,
    amountOfDays : 30,
  },
  DECEMBER : {
    name : 'Diciembre',
    number : 12,
    amountOfDays : 31,
  },
};

export class Month {

  private metadata: any;
  private grid: Array<Array<Day>>;
  private firstDayOfTheFollowingMonth: number = null;

  constructor(metadata: any, year?: number) {

    this.metadata = metadata;
    this.metadata.year = year;
    this.grid = [];
  }

  public Grid(firstDayOfTheWeek?: number): void | Array<Array<Day>> {

    if (firstDayOfTheWeek !== undefined) {

      this.grid = [];
      let day = 1, currentWeekDay;

      while (day <= this.metadata.amountOfDays) {

        currentWeekDay = 0;
        const week = [];

        while (currentWeekDay < firstDayOfTheWeek) {

          week.push(new Day());
          currentWeekDay++;
        }

        while (currentWeekDay < 7 && day <= this.metadata.amountOfDays) {

          week.push(new Day(day++));
          currentWeekDay++;
        }

        firstDayOfTheWeek = currentWeekDay % 7;

        while (currentWeekDay++ < 7) {

          week.push(new Day());
        }

        this.grid.push(week);
      }

      this.firstDayOfTheFollowingMonth = firstDayOfTheWeek;
    } else {

      return this.grid;
    }
  }

  public FirstDayOfTheFollowingMonth(): number {

      return this.firstDayOfTheFollowingMonth;
  }

  public Name(parameterName?: string): void | string {

    if (parameterName) {

      this.metadata.name = parameterName;
    } else {

      return this.metadata.name;
    }
  }

  public DrawWorkingDays(day: number, remainingForTheStart?: number, factor?: number) {

    const n = this.grid.length;
    const today = new Date();

    for (let i = 0; i < n; i++) {

      for (let j = 0; j < 7; j++) {

        const val = this.grid[i][j].Value();

        if (val.length && Number(val) === day) {

          if (remainingForTheStart === 0) {

            factor = 1;
          }

          if (remainingForTheStart === 4) {

            factor = -1;
          }

          const goingThroughDate = new Date(`${this.metadata.year}-${this.metadata.number}-${day}`);

          if (goingThroughDate > today) {

            if (factor === -1) {

              this.grid[i][j].WorkDay();
            } else {

              this.grid[i][j].FreeDay();
            }
          }

          remainingForTheStart += factor;
          day++;
        }
      }
    }

    return {
      remainingForTheStart,
      factor,
    };
  }
}
