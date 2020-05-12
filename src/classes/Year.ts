import { Month } from './Month';

export class Year {

  private months: Array<Month>;
  private year: number;

  constructor(parameterYear?: number) {

    this.year = parameterYear ? parameterYear : new Date().getFullYear();

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
  }

  public Months(): Array<Month> {

    return this.months;
  }
}
