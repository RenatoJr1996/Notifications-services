import { Module } from '@nestjs/common';
import { NotificationsRepository } from 'src/app/repositories/notifications.repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNotificationsRepository } from './prisma/reopositories/prisma.notifications.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [NotificationsRepository],
})
export class DatabaseModule {}
