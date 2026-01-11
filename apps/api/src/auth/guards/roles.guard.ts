import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../../generated/prisma';

/**
 * Guard that checks if the authenticated user has the required role(s)
 * to access a specific endpoint.
 *
 * Usage:
 * @UseGuards(JwtAuthGuard, RolesGuard)
 * @Roles(Role.ADMIN)
 * @Get('users')
 * getAllUsers() { ... }
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  // Reflector is a NestJS utility that reads metadata attached to handlers/classes
  // In this case, it reads the roles we specified in the @Roles() decorator

  canActivate(context: ExecutionContext): boolean {
    // Read the 'roles' metadata from the @Roles() decorator
    // Example: @Roles(Role.ADMIN) → requiredRoles = [Role.ADMIN]
    const requiredRoles = this.reflector.get<Role[]>(
      'roles', // The metadata key we set in the decorator
      context.getHandler(), // The method being called (e.g., getAllUsers)
    );

    if (!requiredRoles) {
      return true; // No @Roles() decorator present, allow access
    }

    // Get the request object which contains the authenticated user
    const request = context.switchToHttp().getRequest();
    const user = request.user; // User info attached by JwtAuthGuard

    // Check if user exists and has one of the required roles
    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true; // User has required role, allow access
  }
}
