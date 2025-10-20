export type Role = "admin" | "customer"

export type UserProps = {
  id: string,
  email: string,
  passwordHash: string,
  role: Role
}

export class User {
  public readonly id: string
  public readonly email: string
  public readonly passwordHash: string
  public readonly role: Role

  constructor(props: UserProps) {
    this.id = props.id
    this.email = props.email
    this.passwordHash = props.passwordHash
    this.role = props.role
  }
}