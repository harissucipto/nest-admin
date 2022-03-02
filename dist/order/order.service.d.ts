import { Repository } from 'typeorm';
import { AbstractService } from '../common/abstract.service';
import { Order } from './order.entity';
export declare class OrderService extends AbstractService {
    private readonly orderRepository;
    constructor(orderRepository: Repository<Order>);
    paginate(page?: number, relations?: any[]): Promise<any>;
    chart(): Promise<any>;
}
