export class User {
  email!: string;
  passwordHash!: string;
  createdAt!: Date;

  constructor(partial: Partial<User>) {
    this.email = partial.email ?? '';
    this.passwordHash = partial.passwordHash ?? '';
    this.createdAt = partial.createdAt ?? new Date();
  }
}
