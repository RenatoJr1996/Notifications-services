import { InMemoryNotificationRepository } from '../../../test/repositories/notifications.memory.repository';
import { Content } from '../../app/entities/content';
import { Notifications } from '../../app/entities/notifications';
import { NotificationsNotFound } from './erros/notificationsNotFound';
import { UnreadNotifications } from './unreadNotification.service';

describe('Read notification', () => {
  test('it should be able to read a notification ', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotifications = new UnreadNotifications(notificationRepository);

    const notification = new Notifications({
      content: new Content('Nova solicitação de amizade'),
      category: 'social',
      recipientId: 'id-de-exemplo',
      readAt: new Date(),
    });

    await notificationRepository.create(notification);

    await unreadNotifications.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });

  test('it should not be able to read a non existing notification ', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotifications = new UnreadNotifications(notificationRepository);

    expect(
      async () =>
        await unreadNotifications.execute({
          notificationId: 'fake',
        }),
    ).rejects.toThrow(NotificationsNotFound);
  });
});
