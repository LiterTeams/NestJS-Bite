// import { Reflector } from "@nestjs/core";

// export const Roles = Reflector.createDecorator<string[]>();

import {SetMetadata} from '@nestjs/common';
import { Role } from 'src/interfaces/enum.interfaces';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);