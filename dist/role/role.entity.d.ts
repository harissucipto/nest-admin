import { Permission } from 'src/permission/permission.entity';
export declare class Role {
    id: number;
    name: string;
    permissions: Permission[];
}
