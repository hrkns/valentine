export class Month {

  private name: string;
  private amountOfDays: number;
  private grid: Array<Array<string>>;
  private firstDayOfTheFollowingMonth: number = null;

  constructor(parameterName: string, parameterAmountOfDays?: number) {

    this.name = parameterName;

    if (parameterAmountOfDays) {

      this.amountOfDays = parameterAmountOfDays;
    }

    this.grid = [];
  }

  public Grid(firstDayOfTheWeek?: number): void | Array<Array<string>> {

    if (firstDayOfTheWeek !== undefined) {

      this.grid = [];
      let day = 1, currentWeekDay;

      while (day <= this.amountOfDays) {

        currentWeekDay = 0;
        const week = [];

        while (currentWeekDay < firstDayOfTheWeek) {

          week.push('');
          currentWeekDay++;
        }

        while (currentWeekDay < 7 && day <= this.amountOfDays) {

          week.push(String(day++));
          currentWeekDay++;
        }

        firstDayOfTheWeek = currentWeekDay % 7;

        while (currentWeekDay++ < 7) {

          week.push('');
        }

        this.grid.push(week);
      }

      this.firstDayOfTheFollowingMonth = firstDayOfTheWeek;

      console.log(this.firstDayOfTheFollowingMonth);
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
}
