import { ConfigModule, ConfigService } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import config from '@/config/index'
import { Configuration } from '@/config/Configuration'

import { IdGenerator } from '@/common/domain/identity/id-generator'

import { CryptoIdGenerator } from '@/common/infrastructure/services/id-generator/crypto-id-generator.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService<Configuration>) => {
        const databaseConfig = config.get('database')
        return databaseConfig
      },
      inject: [ConfigService],
    })
  ],
  providers: [
    { provide: IdGenerator, useClass: CryptoIdGenerator }
  ],
  exports: [
    ConfigModule,
    IdGenerator,
  ]
})
export class CommonModule {}
