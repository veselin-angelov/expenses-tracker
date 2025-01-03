export class EmailPasswordLoginCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
