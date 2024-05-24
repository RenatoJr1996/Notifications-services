import { Content } from './content';

describe('Notifications content', () => {
  test('it should be able to create a notification content', () => {
    const content = new Content('Você recebeu uma solicitação de amizade');

    expect(content).toBeTruthy();
  });

  test('it should not be able to create a notification content with less 5 caracteres', () => {
    expect(() => new Content('aaa')).toThrow();
  });

  test('it should not be able to create a notification content with more than 240 caracteres', () => {
    expect(() => new Content('aaa'.repeat(241))).toThrow();
  });
});
