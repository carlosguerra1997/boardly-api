import { ConfigModule, ConfigService } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import config from '@/config/index'
import { Configuration } from '@/config/Configuration'

import { Hasher } from '@/common/domain/identity/hasher.interface'
import { IdGenerator } from '@/common/domain/identity/id-generator.interface'

import { ArgonHasherService } from '@/modules/auth/infrastructure/services/hasher/argon-hasher.service'
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
    { provide: Hasher, useClass: ArgonHasherService },
    { provide: IdGenerator, useClass: CryptoIdGenerator }
  ],
  exports: [
    ConfigModule,
    Hasher,
    IdGenerator,
  ]
})
export class CommonModule {}
