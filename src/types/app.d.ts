export interface IRegister {
  fullname: string;
  email: string;
  password: string;
  phone: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  image: string;
  createdAt: Date;
  authorId: number;
}

export interface IAuthMiddleware {
  id: string;
}
