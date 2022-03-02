import { Repository } from 'typeorm';
import { User } from './models/user.entity';
import { AbstractService } from '../common/abstract.service';
export declare class UserService extends AbstractService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    paginate(page?: number, relations?: any[]): Promise<any>;
}
