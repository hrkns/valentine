import { Month, MonthsData } from './Month';

export class Year {

  private months: Array<Month>;
  private year: number;
  private next: any;
  private metadataforYears = {};
  private startDateWorkPeriods: Date;

  constructor(parameterYear?: number, startDateWorkPeriods?: Date) {

    parameterYear = parameterYear ? parameterYear : new Date().getFullYear();
    startDateWorkPeriods = startDateWorkPeriods ? startDateWorkPeriods : new Date(`${new Date().getFullYear()}-1-1`);
    this.metadataforYears[parameterYear] = {
      remainingForTheStart : 4,
      factor: -1,
      startDateWorkPeriods,
    };
    this._update(parameterYear);
  }

  public Months(): Array<Month> {

    return this.months;
  }

  public Year(): number {

    return this.year;
  }

  private _update(year: number): void {

    this.year = year;
    this.next = this.metadataforYears[this.year];

    this.months = [
      new Month(MonthsData.JANUARY, this.year),
      new Month(MonthsData.FEBRUARY, this.year),
      new Month(MonthsData.MARCH, this.year),
      new Month(MonthsData.APRIL, this.year),
      new Month(MonthsData.MAY, this.year),
      new Month(MonthsData.JUNE, this.year),
      new Month(MonthsData.JULY, this.year),
      new Month(MonthsData.AUGUST, this.year),
      new Month(MonthsData.SEPTEMBER, this.year),
      new Month(MonthsData.OCTOBER, this.year),
      new Month(MonthsData.NOVEMBER, this.year),
      new Month(MonthsData.DECEMBER, this.year),
    ];

    this.months.forEach((month, index) =>
      month.Grid(index === 0 ?
        new Date(`1/1/${this.year}`).getDay()
        :
        this.months[index - 1].FirstDayOfTheFollowingMonth())
    );

    this.metadataforYears[this.year] = this.next;
  }

  public update(year: number): void {
    this._update(year);
    this.DrawWorkPeriods();
  }

  public DrawWorkPeriods(): Date {

    let startDate = this.metadataforYears[this.year].startDateWorkPeriods;
    let month = startDate.getMonth();

    while (month++ < 12) {

      this.next = this.months[month - 1].DrawWorkingDays(startDate.getDate(), this.next.remainingForTheStart, this.next.factor);
      startDate = new Date(`${startDate.getFullYear()}-${month + 1}-1`);
    }

    this.metadataforYears[this.year + 1] = this.next;
    this.metadataforYears[this.year + 1].startDateWorkPeriods = new Date(`${this.year}-1-1`);

    return this.startDateWorkPeriods;
  }

  public ItIsInTheCurrentYear() {

    return this.year === new Date().getFullYear();
  }
}
