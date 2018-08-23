
export class TransactionDtoBuilder {

  private _id: number;
  private _sequenceNumber: string;
  private _executionDate: Date;
  private _valueDate: Date;
  private _amount: number;
  private _currency: CurrencyEnum;
  private _counterparty: string;
  private _details: string;
  private _accountNumber: string;

  get id(): number {
    return this._id;
  }

  withId(value: number) {
    this._id = value;
    return this;
  }

  get sequenceNumber(): string {
    return this._sequenceNumber;
  }

  withSequenceNumber(value: string) {
    this._sequenceNumber = value;
    return this;
  }

  get executionDate(): Date {
    return this._executionDate;
  }

  withExecutionDate(value: Date) {
    this._executionDate = value;
    return this;
  }

  get valueDate(): Date {
    return this._valueDate;
  }

  withValueDate(value: Date) {
    this._valueDate = value;
    return this;
  }

  get amount(): number {
    return this._amount;
  }

  withAmount(value: number) {
    this._amount = value;
    return this;
  }

  get currency(): CurrencyEnum {
    return this._currency;
  }

  withCurrency(value: CurrencyEnum) {
    this._currency = value;
    return this;
  }

  get counterparty(): string {
    return this._counterparty;
  }

  withCounterparty(value: string) {
    this._counterparty = value;
    return this;
  }

  get details(): string {
    return this._details;
  }

  withDetails(value: string) {
    this._details = value;
    return this;
  }

  get accountNumber(): string {
    return this._accountNumber;
  }

  withAccountNumber(value: string) {
    this._accountNumber = value;
    return this;
  }

  build(): TransactionDto {
    return new TransactionDto(this);
  }

}

export class TransactionDto {
  private _id: number;
  private _sequenceNumber: string;
  private _executionDate: Date;
  private _valueDate: Date;
  private _amount: number;
  private _currency: CurrencyEnum;
  private _counterparty: string;
  private _details: string;
  private _accountNumber: string;

  constructor(builder: TransactionDtoBuilder) {
    this._id= builder.id;
    this._sequenceNumber= builder.sequenceNumber;
    this._executionDate= builder.executionDate;
    this._valueDate= builder.valueDate;
    this._amount= builder.amount;
    this._currency= builder.currency;
    this._counterparty= builder.counterparty;
    this._details= builder.details;
    this._accountNumber= builder.accountNumber;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get sequenceNumber(): string {
    return this._sequenceNumber;
  }

  set sequenceNumber(value: string) {
    this._sequenceNumber = value;
  }

  get executionDate(): Date {
    return this._executionDate;
  }

  set executionDate(value: Date) {
    this._executionDate = value;
  }

  get valueDate(): Date {
    return this._valueDate;
  }

  set valueDate(value: Date) {
    this._valueDate = value;
  }

  get amount(): number {
    return this._amount;
  }

  set amount(value: number) {
    this._amount = value;
  }

  get currency(): CurrencyEnum {
    return this._currency;
  }

  set currency(value: CurrencyEnum) {
    this._currency = value;
  }

  get counterparty(): string {
    return this._counterparty;
  }

  set counterparty(value: string) {
    this._counterparty = value;
  }

  get details(): string {
    return this._details;
  }

  set details(value: string) {
    this._details = value;
  }

  get accountNumber(): string {
    return this._accountNumber;
  }

  set accountNumber(value: string) {
    this._accountNumber = value;
  }

  getAmountWithCurrency() {
    return `${this.amount} ${this.currency}`;
  }

}

