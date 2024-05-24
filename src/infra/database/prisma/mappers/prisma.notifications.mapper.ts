import { Content } from '@app/entities/content';
import { Notifications } from '@app/entities/notifications';
import { Notifications as PrismaNotification } from '@prisma/client';

export class PrismaNotificationsMapper {
  static toPrisma(notification: Notifications) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createAt: notification.createdAt,
    };
  }

  static toDomain(raw: PrismaNotification) {
    return new Notifications(
      {
        category: raw.category,
        content: new Content(raw.content),
        recipientId: raw.recipientId,
        canceledAt: raw.canceldAt,
        readAt: raw.readAt,
        createdAt: raw.createAt,
      },
      raw.id,
    );
  }
}
