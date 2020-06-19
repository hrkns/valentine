import {Day} from './Day';

export class Month {

  private name: string;
  private amountOfDays: number;
  private grid: Array<Array<Day>>;
  private firstDayOfTheFollowingMonth: number = null;

  constructor(parameterName: string, parameterAmountOfDays?: number) {

    this.name = parameterName;

    if (parameterAmountOfDays) {

      this.amountOfDays = parameterAmountOfDays;
    }

    this.grid = [];
  }

  public Grid(firstDayOfTheWeek?: number): void | Array<Array<Day>> {

    if (firstDayOfTheWeek !== undefined) {

      this.grid = [];
      let day = 1, currentWeekDay;

      while (day <= this.amountOfDays) {

        currentWeekDay = 0;
        const week = [];

        while (currentWeekDay < firstDayOfTheWeek) {

          week.push(new Day());
          currentWeekDay++;
        }

        while (currentWeekDay < 7 && day <= this.amountOfDays) {

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

      this.name = parameterName;
    } else {

      return this.name;
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

          if (factor === -1) {

            this.grid[i][j].WorkDay();
          } else {

            this.grid[i][j].FreeDay();
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
