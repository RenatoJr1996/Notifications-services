import { CancelNotifications } from '@app/services/cancelNotifications.service';
import { CountRecipientsNotifications } from '@app/services/countNotifications.service';
import { GetRecipientsNotifications } from '@app/services/getRecipientNotifications.service';
import { ReadNotifications } from '@app/services/readNotification.service';
import { UnreadNotifications } from '@app/services/unreadNotification.service';
import { Module } from '@nestjs/common';
import { SendNotification } from 'src/app/services/sendNotifications.service';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controller/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotifications,
    ReadNotifications,
    UnreadNotifications,
    GetRecipientsNotifications,
    CountRecipientsNotifications,
  ],
})
export class HttpModule {}
