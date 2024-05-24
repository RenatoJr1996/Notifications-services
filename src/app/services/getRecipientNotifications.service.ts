import { Notifications } from '@app/entities/notifications';
import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications.repository';

interface IGetRecipientsNotifications {
  recipientId: string;
}

interface IGetRecipientsNotificationsResponse {
  notifications: Notifications[];
}

@Injectable()
export class GetRecipientsNotifications {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    request: IGetRecipientsNotifications,
  ): Promise<IGetRecipientsNotificationsResponse> {
    const { recipientId } = request;

    const notifications =
      await this.notificationRepository.findManyByRecipientId(recipientId);

    return { notifications };
  }
}
