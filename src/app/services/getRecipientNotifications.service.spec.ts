import { makeNotification } from '../../../test/factories/notification.factory';
import { InMemoryNotificationRepository } from '../../../test/repositories/notifications.memory.repository';
import { GetRecipientsNotifications } from './getRecipientNotifications.service';

describe('Get Recipient notification', () => {
  test('it should be able to get recipients notifications ', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const getRecipientsNotifications = new GetRecipientsNotifications(
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

    const { notifications } = await getRecipientsNotifications.execute({
      recipientId: 'id-de-exemplo',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'id-de-exemplo' }),
        expect.objectContaining({ recipientId: 'id-de-exemplo' }),
      ]),
    );
  });
});
