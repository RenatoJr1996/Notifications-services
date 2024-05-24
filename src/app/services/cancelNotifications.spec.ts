import { InMemoryNotificationRepository } from '../../../test/repositories/notifications.memory.repository';
import { Content } from '../../app/entities/content';
import { Notifications } from '../../app/entities/notifications';
import { CancelNotifications } from './cancelNotifications.service';
import { NotificationsNotFound } from './erros/notificationsNotFound';

describe('Cancel notification', () => {
  test('it should be able to cancel a notification ', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotifications = new CancelNotifications(notificationRepository);

    const notification = new Notifications({
      content: new Content('Nova solicitação de amizade'),
      category: 'social',
      recipientId: 'id-de-exemplo',
    });

    await notificationRepository.create(notification);

    await cancelNotifications.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].canceledAt).toBeDefined();
  });

  test('it should not be able to cancel a non existing notification ', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotifications = new CancelNotifications(notificationRepository);

    expect(
      async () =>
        await cancelNotifications.execute({
          notificationId: 'fake',
        }),
    ).rejects.toThrow(NotificationsNotFound);
  });
});
