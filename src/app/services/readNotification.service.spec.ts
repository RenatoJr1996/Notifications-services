import { InMemoryNotificationRepository } from '../../../test/repositories/notifications.memory.repository';
import { Content } from '../../app/entities/content';
import { Notifications } from '../../app/entities/notifications';
import { NotificationsNotFound } from './erros/notificationsNotFound';
import { ReadNotifications } from './readNotification.service';

describe('Read notification', () => {
  test('it should be able to read a notification ', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotifications = new ReadNotifications(notificationRepository);

    const notification = new Notifications({
      content: new Content('Nova solicitação de amizade'),
      category: 'social',
      recipientId: 'id-de-exemplo',
    });

    await notificationRepository.create(notification);

    await readNotifications.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toBeDefined();
  });

  test('it should not be able to read a non existing notification ', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotifications = new ReadNotifications(notificationRepository);

    expect(
      async () =>
        await readNotifications.execute({
          notificationId: 'fake',
        }),
    ).rejects.toThrow(NotificationsNotFound);
  });
});
