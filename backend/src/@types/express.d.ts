declare namespace Express {
  export interface Request {
    user: {
      id: string;
      company_id: string;
    };
    company_idd: string;
  }
}
