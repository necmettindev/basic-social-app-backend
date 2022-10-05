import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateToken(request);
  }

  validateToken(request: any): boolean {
    const excludedRoutes = this.configService.get<string[]>('EXCLUDED_ROUTES');
    if (excludedRoutes.includes(request.url)) return true;
    const { 'x-access-token': accessToken } = request.headers;
    if (accessToken === undefined) return false;
    const decoded = this.jwtService.decode(accessToken);
    if (decoded === undefined) return false;
    request.headers.decoded = decoded;
    return true;
  }
}
