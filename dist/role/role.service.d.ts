import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
export declare class RoleService extends AbstractService {
    private readonly roleRepository;
    constructor(roleRepository: Repository<Role>);
}
