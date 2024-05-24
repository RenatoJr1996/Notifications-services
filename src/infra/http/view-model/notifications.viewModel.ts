import { Notifications } from '@app/entities/notifications';

export class NotificationsViewModel {
  static toHttp(notification: Notifications) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
    };
  }
}
