import { Content } from './content';
import { Notifications } from './notifications';

describe('Notifications', () => {
  test('it should be able to create a notification', () => {
    const notification = new Notifications({
      content: new Content('Nova solicitação de amiza'),
      category: 'social',
      recipientId: 'id-de-exemplo',
    });

    expect(notification).toBeTruthy();
  });
});
