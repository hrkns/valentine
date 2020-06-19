import { Month } from './Month';

export class Year {

  private months: Array<Month>;
  private year: number;
  private next: any;
  private nexes = {};

  constructor(parameterYear?: number) {

    parameterYear = parameterYear ? parameterYear : new Date().getFullYear();
    this.nexes[parameterYear] = {
      remainingForTheStart : 4,
      factor: -1,
    };
    this.update(parameterYear);
  }

  public Months(): Array<Month> {

    return this.months;
  }

  public Year(): number {

    return this.year;
  }

  public update(parameterYear: number): void {

    this.year = parameterYear;
    this.next = this.nexes[this.year];

    this.months = [
      new Month('Enero', 31),
      new Month('Febrero', 28 + Number(((this.year % 4 === 0) && (this.year % 100 !== 0)) || (this.year % 400 === 0))),
      new Month('Marzo', 31),
      new Month('Abril', 30),
      new Month('Mayo', 31),
      new Month('Junio', 30),
      new Month('Julio', 31),
      new Month('Agosto', 31),
      new Month('Septiembre', 30),
      new Month('Octubre', 31),
      new Month('Noviembre', 30),
      new Month('Diciembre', 31),
    ];

    this.months.forEach((month, index) =>
      month.Grid(index === 0 ?
        new Date(`1/1/${this.year}`).getDay()
        :
        this.months[index - 1].FirstDayOfTheFollowingMonth())
    );

    this.nexes[this.year] = this.next;

    if (this.year > new Date().getFullYear()) {

      this.StartDateWorkPeriods(new Date(`${this.year}-1-1`));
    }
  }

  public StartDateWorkPeriods(value?: Date): Date | void {

    if (value) {

      let month = value.getMonth();

      while (month++ < 12) {

        this.next = this.months[month - 1].DrawWorkingDays(value.getDate(), this.next.remainingForTheStart, this.next.factor);
        value = new Date(`${value.getFullYear()}-${month + 1}-1`);
      }

      this.nexes[this.year + 1] = this.next;
    }
  }
}
