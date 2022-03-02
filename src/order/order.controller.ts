import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '../auth/auth.guard';
import { Response } from 'express';
import { Parser } from 'json2csv';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { HasPermission } from '../permission/has-permission.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('orders')
  @HasPermission('orders')
  async all(@Query('page') page = 1) {
    // return this.orderService.all(['order_items']);
    return this.orderService.paginate(page, ['order_items']);
  }

  @Post('export')
  @HasPermission('orders')
  async export(@Res() res: Response) {
    const parser = new Parser({
      fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity'],
    });

    const orders = await this.orderService.all(['order_items']);

    const json = [];

    orders.forEach((order: Order) => {
      json.push({
        ID: order.id,
        Name: order.name,
        Email: order.email,
        'Product Title': '',
        Price: '',
        Quantity: '',
      });

      order.order_items.forEach((orderItem: OrderItem) => {
        json.push({
          ID: '',
          Name: '',
          Email: '',
          'Product Title': orderItem.price,
          Price: orderItem.price,
          Quantity: orderItem.quantity,
        });
      });
    });

    const csv = parser.parse(json);

    res.header('Content-Type', 'text/csv');
    res.attachment('orders.csv');
    return res.send(csv);
  }

  @Get('chart')
  @HasPermission('orders')
  async chart() {
    return this.orderService.chart();
  }
}
