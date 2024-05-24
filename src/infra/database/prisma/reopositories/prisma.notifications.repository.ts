import { Injectable } from '@nestjs/common';
import { Notifications } from '../../../../app/entities/notifications';
import { NotificationsRepository } from '../../../../app/repositories/notifications.repository';
import { PrismaNotificationsMapper } from '../mappers/prisma.notifications.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async countManyRecipientId(recipientId: string): Promise<number> {
    const count = await this.prismaService.notifications.count({
      where: {
        recipientId,
      },
    });

    return count;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notifications[]> {
    const notification = await this.prismaService.notifications.findMany({
      where: { recipientId },
    });

    if (!notification) return null;

    return notification.map(PrismaNotificationsMapper.toDomain);
  }
  async save(notification: Notifications): Promise<void> {
    const raw = PrismaNotificationsMapper.toPrisma(notification);

    await this.prismaService.notifications.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }

  async findBydId(notificationId: string): Promise<Notifications> {
    const notification = await this.prismaService.notifications.findUnique({
      where: { id: notificationId },
    });

    if (!notification) return null;

    return PrismaNotificationsMapper.toDomain(notification);
  }

  async create(notification: Notifications): Promise<void> {
    const raw = PrismaNotificationsMapper.toPrisma(notification);
    await this.prismaService.notifications.create({
      data: raw,
    });
  }
}
