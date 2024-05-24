import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications.repository';
import { NotificationsNotFound } from './erros/notificationsNotFound';

interface ICancelNotifications {
  notificationId: string;
}

type ICancelNotificationsResponse = void;

@Injectable()
export class CancelNotifications {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    request: ICancelNotifications,
  ): Promise<ICancelNotificationsResponse> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findBydId(
      notificationId,
    );

    if (!notification) {
      throw new NotificationsNotFound();
    }

    notification.cancel();

    await this.notificationRepository.save(notification);
  }
}
