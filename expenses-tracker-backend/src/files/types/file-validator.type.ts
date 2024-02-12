export type FileValidator = {
  validate: (file: Express.Multer.File) => Promise<boolean> | boolean;
  errorMessage: string;
};
