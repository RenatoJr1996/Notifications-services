import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications.repository';

interface ICountRecipientsNotifications {
  recipientId: string;
}

interface ICountRecipientsNotificationsResponse {
  count: number;
}

@Injectable()
export class CountRecipientsNotifications {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    request: ICountRecipientsNotifications,
  ): Promise<ICountRecipientsNotificationsResponse> {
    const { recipientId } = request;

    const count = await this.notificationRepository.countManyRecipientId(
      recipientId,
    );

    return { count };
  }
}
