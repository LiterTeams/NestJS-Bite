// import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException,} from '@nestjs/common';
// import { TokenService } from 'src/modules/token/token.service';

// @Injectable()
// export class AuthGuard implements CanActivate {
//     constructor(private readonly tokenService: TokenService) {}
    
//     async canActivate(context: ExecutionContext): Promise<boolean> {
//         try {
//             const request = context.switchToHttp().getRequest();
//             const { authorization }: any = request.headers;
//             if (!authorization || authorization.trim() === '') {
//                 throw new UnauthorizedException('Please provide token');
//         }
//             const accessToken = authorization.replace(/bearer/gim, '').trim();
//             const resp = await this.tokenService.validateToken(accessToken);
//             request.decodedData = resp;
//             return true;
//         } catch (error) {
//             console.log('auth error - ', error.message);
//             throw new ForbiddenException(error.message || 'session expired! Please sign In');
//         }
//     }
// }

// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthGuard implements CanActivate {
//     canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
//         const request = context.switchToHttp().getRequest();
//         return this.validateRequest(request);
//     }

//     validateRequest(request) {
//         console.log(request);
//         return true;
//     }
// }