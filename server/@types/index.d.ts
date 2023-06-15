declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
    }
  }
}

// export type User = Express.User;
export {}
