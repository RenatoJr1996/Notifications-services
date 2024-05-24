import { CancelNotifications } from '@app/services/cancelNotifications.service';
import { CountRecipientsNotifications } from '@app/services/countNotifications.service';
import { GetRecipientsNotifications } from '@app/services/getRecipientNotifications.service';
import { ReadNotifications } from '@app/services/readNotification.service';
import { UnreadNotifications } from '@app/services/unreadNotification.service';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from 'src/app/services/sendNotifications.service';
import { CreateNotificationsDto } from '../dtos/createNotificationsDto';
import { NotificationsViewModel } from '../view-model/notifications.viewModel';

@Controller('/notifications')
export class NotificationsController {
  constructor(
    private sendNotificationService: SendNotification,
    private cancelNotifications: CancelNotifications,
    private readNotification: ReadNotifications,
    private unreadNotifications: UnreadNotifications,
    private getRecipientsNotifications: GetRecipientsNotifications,
    private countRecipientsNotifications: CountRecipientsNotifications,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotifications.execute({ notificationId: id });
  }

  @Get('count/from/:id')
  async countFromRecipient(@Param('id') id: string) {
    const { count } = await this.countRecipientsNotifications.execute({
      recipientId: id,
    });

    return { count };
  }

  @Get('/from/:id')
  async getFromRecipient(@Param('id') id: string) {
    const { notifications } = await this.getRecipientsNotifications.execute({
      recipientId: id,
    });

    return {
      notifications: notifications.map(NotificationsViewModel.toHttp),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotifications.execute({ notificationId: id });
  }

  @Post()
  async createNotifications(@Body() body: CreateNotificationsDto) {
    const { recipientId, category, content } = body;

    const { notification } = await this.sendNotificationService.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: NotificationsViewModel.toHttp(notification),
    };
  }
}
