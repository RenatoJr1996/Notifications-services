import { makeNotification } from '../../../test/factories/notification.factory';
import { InMemoryNotificationRepository } from '../../../test/repositories/notifications.memory.repository';
import { CountRecipientsNotifications } from './countNotifications.service';

describe('Count notification', () => {
  test('it should be able to count a notification ', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientsNotifications = new CountRecipientsNotifications(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'id-de-exemplo' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'id-de-exemplo' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'id-de-errado' }),
    );

    const { count } = await countRecipientsNotifications.execute({
      recipientId: 'id-de-exemplo',
    });

    expect(count).toEqual(2);
  });
});
