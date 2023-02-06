export interface ILogin {
  email: string,
  password:string
}

export interface IJwt {
  data: {
    email: string,
    password: string,
  }
}