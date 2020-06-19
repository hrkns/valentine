export class Day {

  private number = '';
  private freeDay = true;
  private cssClass = '';

  constructor(value?: string | number) {

    this.number = value ? String(value) : '';
  }

  public Value() {

    return this.number;
  }

  public FreeDay() {

    this.freeDay = true;
    this.cssClass = 'day-free';
  }

  public WorkDay() {

    this.freeDay = false;
    this.cssClass = 'day-work';
  }

  public IsFreeDay() {

    return this.freeDay;
  }

  public IsWorkDay() {

    return !this.IsFreeDay();
  }

  public ClassType() {

    return this.cssClass;
  }
}
