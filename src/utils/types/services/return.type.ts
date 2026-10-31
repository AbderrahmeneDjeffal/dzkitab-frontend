import { ErrorType } from "@/utils/functions/services/shared/error-handler";

export type ReturnType<T> = Promise<
    | {
          data: T;
          error?: undefined;
      }
    | {
          data?: undefined;
          error: ErrorType;
      }
>;
