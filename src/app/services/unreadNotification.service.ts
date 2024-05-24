import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications.repository';
import { NotificationsNotFound } from './erros/notificationsNotFound';

interface IUnreadNotifications {
  notificationId: string;
}

type IUnreadNotificationsResponse = void;

@Injectable()
export class UnreadNotifications {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    request: IUnreadNotifications,
  ): Promise<IUnreadNotificationsResponse> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findBydId(
      notificationId,
    );

    if (!notification) {
      throw new NotificationsNotFound();
    }

    notification.unread();

    await this.notificationRepository.save(notification);
  }
}
