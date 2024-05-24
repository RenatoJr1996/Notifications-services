import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications.repository';
import { NotificationsNotFound } from './erros/notificationsNotFound';

interface IReadNotifications {
  notificationId: string;
}

type IReadNotificationsResponse = void;

@Injectable()
export class ReadNotifications {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    request: IReadNotifications,
  ): Promise<IReadNotificationsResponse> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findBydId(
      notificationId,
    );

    if (!notification) {
      throw new NotificationsNotFound();
    }

    notification.read();

    await this.notificationRepository.save(notification);
  }
}
