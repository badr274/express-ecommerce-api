declare global {
  namespace Express {
    interface Locals {
      pagination: {
        page: number;
        limit: number;
      };
    }
  }
}

export {};
