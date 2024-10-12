import { SetMetadata } from "@nestjs/common";
import { Role } from "./auth.enum";

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);