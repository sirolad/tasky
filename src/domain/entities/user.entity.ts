export class User {
  private _name: string;
  private _email: string;

  constructor(
    public readonly id: string,
    name: string,
    email: string,
  ) {
    this._name = name;
    this._email = email;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  updateName(name: string): void {
    this._name = name;
  }

  updateEmail(email: string): void {
    this._email = email;
  }
}
