import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractService } from '../common/abstract.service';
import { Order } from './order.entity';

@Injectable()
export class OrderService extends AbstractService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {
    super(orderRepository);
  }

  async paginate(page = 1, relations = []): Promise<any> {
    const { data, meta } = await super.paginate(page, relations);
    return {
      data: data.map((order) => ({
        id: order.id,
        name: order.name,
        email: order.email,
        created_at: order.created_at,
        total: order.total,
        order_items: order.order_items,
      })),
      meta,
    };
  }

  async chart() {
    return this.orderRepository.query(`
      SELECT DATE_FORMAT(o.created_at, '%Y-%m-%d') AS date, SUM(i.price * i.quantity) AS sum
      FROM orders o
      JOIN order_items i ON o.id = i.order_id
      GROUP BY date;
    `);
  }
}
