import { getRandomId } from './utils';

describe('Utils', () => {
  it('should provide a random id', () => {
    const a = getRandomId();
    const b = getRandomId();

    expect(typeof a).toEqual('number');
    expect(a).not.toEqual(b);
  });
});
