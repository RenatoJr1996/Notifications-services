import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notifications } from '../entities/notifications';
import { NotificationsRepository } from '../repositories/notifications.repository';

interface ISendNotification {
  recipientId: string;
  content: string;
  category: string;
}

interface ISendNotificationResponse {
  notification: Notifications;
}

@Injectable()
export class SendNotification {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    request: ISendNotification,
  ): Promise<ISendNotificationResponse> {
    const { category, content, recipientId } = request;

    const notification = new Notifications({
      category,
      content: new Content(content),
      recipientId,
    });

    await this.notificationRepository.create(notification);

    return { notification };
  }
}
