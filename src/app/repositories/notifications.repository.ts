import { Notifications } from '../entities/notifications';

export abstract class NotificationsRepository {
  abstract create(notification: Notifications): Promise<void>;
  abstract save(notification: Notifications): Promise<void>;
  abstract countManyRecipientId(recipientId: string): Promise<number>;
  abstract findBydId(notificationId: string): Promise<Notifications | null>;
  abstract findManyByRecipientId(recipientId: string): Promise<Notifications[]>;
}
