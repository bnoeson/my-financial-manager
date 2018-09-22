
export class InvestmentDtoBuilder {

  private _id: number;
  private _name: string;

  get id(): number {
    return this._id;
  }

  withId(value: number) {
    this._id = value;
    return this;
  }

  get name(): string {
    return this._name;
  }

  withName(value: string) {
    this._name = value;
    return this;
  }

  build(): InvestmentDto {
    return new InvestmentDto(this);
  }

}


export class InvestmentDto {
  private _id: number;
  private _name: string;

  constructor(builder: InvestmentDtoBuilder) {
    this._id = builder.id;
    this._name = builder.name;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

}
