export class AsyncJSON {
  public static stringify(obj: object): Promise<string> {
    return new Promise<string>((resolve: (value?: (PromiseLike<string> | string)) => void, reject: (reason?: any) => void) => {
      try {
        resolve(JSON.stringify(obj));
      }
      catch (err: unknown) {
        reject(err);
      }
    });
  }
}
