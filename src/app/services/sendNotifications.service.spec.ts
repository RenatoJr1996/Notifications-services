import { InMemoryNotificationRepository } from '../../../test/repositories/notifications.memory.repository';
import { SendNotification } from './sendNotifications.service';

describe('Send notification', () => {
  test('it should be able to send a notification ', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const sendNotification = new SendNotification(notificationRepository);

    await sendNotification.execute({
      content: 'Nova solicitação de amizade',
      category: 'social',
      recipientId: 'id-de-exemplo',
    });

    expect(notificationRepository.notifications).toHaveLength(1);
  });
});
