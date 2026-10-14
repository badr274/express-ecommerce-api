declare global {
  namespace Express {
    interface Locals {
      validated?: {
        body?: any;
        params?: any;
        query?: any;
      };
    }
  }
}

export {};
