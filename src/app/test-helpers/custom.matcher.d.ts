// tslint:disable-next-line:no-namespace
declare namespace jasmine {
  interface Matchers<T> {
    toBeEqualWithMessage(expected: any, expectationFailOutput?: any): boolean;
  }
}
