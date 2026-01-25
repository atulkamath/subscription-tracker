import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Req,
  Res,
  BadRequestException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get('total')
  getTotalCost(@Req() req: Request) {
    const uid = req.cookies.uid as string;
    if (!uid) {
      throw new BadRequestException('uid cookie required');
    }
    return this.subscriptionsService.getTotalCost(uid);
  }

  @Get('calendar')
  async getCalendarExport(
    @Req() req: Request,
    @Res() res: Response,
    @Query('remind') remind?: string,
    @Query('timezone') timezone?: string,
  ) {
    const uid = req.cookies.uid as string;
    if (!uid) {
      throw new BadRequestException('uid cookie required');
    }

    if (!remind) {
      throw new BadRequestException('remind is required');
    }

    const allowedValues = ['0', '1', '2', '7'];
    if (!allowedValues.includes(remind)) {
      throw new BadRequestException('remind must be one of: 0, 1, 2, or 7');
    }

    const remindDays = parseInt(remind, 10);
    const userTimezone = timezone || 'UTC';

    const icsContent = await this.subscriptionsService.getCalendarExport(
      uid,
      remindDays,
      userTimezone,
    );

    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="subscriptions.ics"',
    );

    res.send(icsContent);
  }

  @Get()
  findAll(@Req() req: Request) {
    const uid = req.cookies.uid as string;
    if (!uid) {
      throw new BadRequestException('uid cookie required');
    }
    return this.subscriptionsService.findAll(uid);
  }

  @Post()
  create(@Req() req: Request, @Body() dto: CreateSubscriptionDto) {
    const uid = req.cookies.uid as string;
    if (!uid) {
      throw new BadRequestException('uid cookie required');
    }
    return this.subscriptionsService.create(uid, dto);
  }

  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() dto: UpdateSubscriptionDto,
  ) {
    const uid = req.cookies.uid as string;
    if (!uid) {
      throw new BadRequestException('uid cookie required');
    }
    return this.subscriptionsService.update(uid, id, dto);
  }

  @Delete(':id')
  delete(@Req() req: Request, @Param('id') id: string) {
    const uid = req.cookies.uid as string;
    if (!uid) {
      throw new BadRequestException('uid cookie required');
    }
    return this.subscriptionsService.delete(uid, id);
  }
}
