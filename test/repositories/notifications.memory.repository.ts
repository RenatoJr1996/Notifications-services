import { Notifications } from 'src/app/entities/notifications';
import { NotificationsRepository } from 'src/app/repositories/notifications.repository';

export class InMemoryNotificationRepository implements NotificationsRepository {
  public notifications: Notifications[] = [];

  async findManyByRecipientId(recipientId: string): Promise<Notifications[]> {
    return this.notifications.filter(
      (item) => item.recipientId === recipientId,
    );
  }
  async countManyRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter((item) => item.recipientId === recipientId)
      .length;
  }

  async save(notification: Notifications): Promise<void> {
    const index = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (index >= 0) {
      this.notifications[index] = notification;
    }
  }
  async findBydId(notificationId: string): Promise<Notifications> {
    const notification = this.notifications.find(
      (item) => item.id === notificationId,
    );

    if (!notification) return null;

    return notification;
  }

  async create(notification: Notifications) {
    this.notifications.push(notification);
  }
}
