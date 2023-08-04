declare module 'express-serve-static-core' {
    interface Request {
      decodedToken?: any; // Change `any` to the type of your decoded token if available
    }
  }