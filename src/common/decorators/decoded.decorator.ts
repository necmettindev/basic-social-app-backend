import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const DecodedHTTP = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const { decoded } = request.headers;
  return decoded;
});
