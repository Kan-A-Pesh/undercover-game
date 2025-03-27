import { Response } from ".";

export const success = <T>(data: T): Response<T> => ({
    success: true,
    data: data,
    error: null,
});

export const failure = <T>(err: string): Response<T> => ({
    success: false,
    data: null,
    error: err,
});
