declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
    }
    interface Request {
      file: Express.Multer.File & Express.MulterS3.File;
    }
  }
}

export {};
