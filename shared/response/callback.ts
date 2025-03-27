import { Response } from ".";

export type ResponseCallback<T> = (response: Response<T> ) => void;