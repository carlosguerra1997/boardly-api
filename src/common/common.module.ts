import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common'

import config from '@/config/index'

import { Hasher } from '@/common/domain/identity/hasher'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true
    })
  ],
  exports: [
    Hasher
  ]
})
export class CommonModule {}
