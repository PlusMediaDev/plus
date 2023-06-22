declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File & Express.MulterS3.File;
    }
    interface User {
      id: number;
      email: string;
      tokens: number;
      lastUploadedAt: Date | null;
    }
  }
}

export {};
