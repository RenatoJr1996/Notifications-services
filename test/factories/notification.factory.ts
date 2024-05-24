/* eslint-disable prettier/prettier */
import { Content } from '../../src/app/entities/content';
import {
  Notifications,
  NotificationsProps,
} from '../../src/app/entities/notifications';

type Override = Partial<NotificationsProps>;

export function makeNotification(override: Override = {}) {
  return new Notifications({
    content: new Content('Nova solicitação de amizade'),
    category: 'social',
    recipientId: 'id-de-errado',
    ...override,
  });
}
