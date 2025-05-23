import { APP_FILTER } from '@nestjs/core'
import { Module } from '@nestjs/common'

import { HttpExceptionFilter } from '@/common/infrastructure/interceptors/http-exception-filter'

import { AuthModule } from '@/modules/auth/infrastructure/auth.module'
import { BoardModule } from '@/modules/board/infrastructure/board.module'
import { CommonModule } from '@/common/common.module'
import { UserModule } from '@/modules/user/infrastructure/user.module'

@Module({
  imports: [
    AuthModule,
    BoardModule,
    CommonModule,
    UserModule
  ],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter }
  ]
})
export class AppModule {}
