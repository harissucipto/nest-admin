import { Repository } from 'typeorm';
import { PaginatedResult } from './paginated-result.interface';
export declare abstract class AbstractService {
    protected readonly repository: Repository<any>;
    constructor(repository: Repository<any>);
    all(relations?: any[]): Promise<any[]>;
    paginate(page?: number, relations?: any[]): Promise<PaginatedResult>;
    create(data: any): Promise<any>;
    findOne(condition: any, relations?: any[]): Promise<any>;
    update(id: number, data: any): Promise<any>;
    delete(id: number): Promise<any>;
}
