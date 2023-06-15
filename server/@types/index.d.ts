declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
      tokens: number;
    }
  }
}

export {};
