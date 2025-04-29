import { AuthorziationGuard } from './authorziation.guard';

describe('AuthorziationGuard', () => {
  it('should be defined', () => {
    expect(new AuthorziationGuard()).toBeDefined();
  });
});
