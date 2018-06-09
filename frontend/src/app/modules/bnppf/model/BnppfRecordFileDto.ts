
export class BnppfRecordFileDtoBuilder {

  private _id: number;
  private _uploadDateTime: Date;
  private _name: string;
  private _size: number;

  get id(): number {
    return this._id;
  }

  withId(value: number) {
    this._id = value;
    return this;
  }

  get uploadDateTime(): Date {
    return this._uploadDateTime;
  }

  withUploadDateTime(value: Date) {
    this._uploadDateTime = value;
    return this;
  }

  get name(): string {
    return this._name;
  }

  withName(value: string) {
    this._name = value;
    return this;
  }

  get size(): number {
    return this._size;
  }

  withSize(value: number) {
    this._size = value;
    return this;
  }

  build(): BnppfRecordFileDto {
    return new BnppfRecordFileDto(this);
  }

}

export class BnppfRecordFileDto {
  private _id: number;
  private _uploadDateTime: Date;
  private _name: string;
  private _size: number;

  constructor(builder: BnppfRecordFileDtoBuilder) {
    this._id = builder.id;
    this._uploadDateTime = builder.uploadDateTime;
    this._name = builder.name;
    this._size = builder.size;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get uploadDateTime(): Date {
    return this._uploadDateTime;
  }

  set uploadDateTime(value: Date) {
    this._uploadDateTime = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this._size = value;
  }
}

