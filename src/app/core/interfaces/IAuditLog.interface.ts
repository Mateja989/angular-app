export interface IAuditLog {
    userId: number;
    identity: string;
    useCaseName: string;
    executionDateTime: Date;
    isAuthorized: boolean;
    data: string;
  }
  