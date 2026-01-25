import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import type { Subscription } from '@prisma/client';
import { DateTime } from 'luxon';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.subscription.findMany({
      where: { userId },
    });
  }

  async create(userId: string, dto: CreateSubscriptionDto) {
    return this.prisma.subscription.create({
      data: {
        userId,
        ...dto,
      },
    });
  }

  async update(userId: string, id: string, dto: UpdateSubscriptionDto) {
    return this.prisma.subscription.updateMany({
      where: {
        id,
        userId,
      },
      data: dto,
    });
  }

  async delete(userId: string, id: string) {
    return this.prisma.subscription.deleteMany({
      where: {
        id,
        userId,
      },
    });
  }

  async getCalendarExport(
    userId: string,
    remindDays: number,
    timezone: string,
  ): Promise<string> {
    const subscriptions = await this.prisma.subscription.findMany({
      where: { userId },
    });

    return this.generateICS(subscriptions, remindDays, timezone);
  }

  private generateICS(
    subscriptions: Subscription[],
    remindDays: number,
    timezone: string,
  ): string {
    const now = new Date();
    const timestamp = this.formatICSTimestamp(now);

    let ics = 'BEGIN:VCALENDAR\r\n';
    ics += 'VERSION:2.0\r\n';
    ics += 'PRODID:-//Subscription Tracker//EN\r\n';
    ics += 'CALSCALE:GREGORIAN\r\n';
    ics += 'METHOD:PUBLISH\r\n';

    for (const sub of subscriptions) {
      const eventDate = this.calculateEventDate(
        sub.renewalDay,
        remindDays,
        timezone,
      );
      const reminderDate = this.calculateReminderDate(
        eventDate,
        remindDays,
        timezone,
      );

      ics += 'BEGIN:VEVENT\r\n';
      ics += `UID:${sub.id}@subscription-tracker\r\n`;
      ics += `DTSTAMP:${timestamp}\r\n`;
      ics += `DTSTART;VALUE=DATE:${this.formatICSDate(eventDate)}\r\n`;
      ics += `SUMMARY:${this.escapeICSText(sub.name)} - Payment Due\r\n`;
      ics += `STATUS:CONFIRMED\r\n`;
      ics += `X-APPLE-TRAVEL-ADVISORY-BEHAVIOR:AUTOMATIC\r\n`;

      if (remindDays > 0) {
        ics += 'BEGIN:VALARM\r\n';
        ics += `UID:alarm-${sub.id}\r\n`;
        ics += 'ACTION:DISPLAY\r\n';
        ics += `DESCRIPTION:Reminder: ${this.escapeICSText(sub.name)} payment in ${remindDays} day${remindDays > 1 ? 's' : ''}\r\n`;
        ics += `TRIGGER;VALUE=DATE-TIME:${this.formatICSTimestamp(reminderDate)}\r\n`;
        ics += 'X-APPLE-DEFAULT-ALARM:TRUE\r\n';
        ics += 'END:VALARM\r\n';
      } else {
        ics += 'BEGIN:VALARM\r\n';
        ics += 'ACTION:NONE\r\n';
        ics += `TRIGGER;VALUE=DATE-TIME:${this.formatICSTimestamp(eventDate)}\r\n`;
        ics += 'END:VALARM\r\n';
      }

      ics += 'END:VEVENT\r\n';
    }

    ics += 'END:VCALENDAR\r\n';

    return ics;
  }

  private calculateEventDate(
    renewalDay: number,
    remindDays: number,
    timezone: string,
  ): Date {
    const now = DateTime.now().setZone(timezone);
    const currentYear = now.year;
    const currentMonth = now.month;

    let eventDate = DateTime.fromObject(
      { year: currentYear, month: currentMonth, day: renewalDay },
      { zone: timezone },
    );

    if (eventDate <= now) {
      eventDate = eventDate.plus({ months: 1 });
    }

    const reminderDate = eventDate.minus({ days: remindDays }).set({
      hour: 9,
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    if (reminderDate <= now) {
      eventDate = eventDate.plus({ months: 1 });
    }

    return eventDate.toJSDate();
  }

  private calculateReminderDate(
    eventDate: Date,
    remindDays: number,
    timezone: string,
  ): Date {
    const eventDateTime = DateTime.fromJSDate(eventDate, { zone: timezone });
    const reminderDateTime = eventDateTime.minus({ days: remindDays }).set({
      hour: 9,
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    return reminderDateTime.toUTC().toJSDate();
  }

  private formatICSDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }

  private formatICSTimestamp(date: Date): string {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
  }

  private escapeICSText(text: string): string {
    return text
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\n/g, '\\n');
  }
}
