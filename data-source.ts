import { UserSchema } from '@/modules/user/infrastructure/persistence/typeorm/mapping/user-schema'
import * as dotenv from 'dotenv'
import * as glob from 'glob'
import { DataSource, DataSourceOptions, EntitySchema } from 'typeorm'

dotenv.config()

const entityFiles = glob.sync('dist/src/modules/**/*mapping/*.js', {
  ignore: [ '**/embeddeds/**' ]
})
const entities: any = entityFiles.flatMap(file => {
    try {
			const module = require(`/srv/app/api/${file}`)
			return Object.values(module).filter(exported => exported instanceof EntitySchema)
    } catch (error) {
      return []
    }
})

const databasePort: string = process.env.DATABASE_PORT as string

const dbConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'database',
  port: parseInt(databasePort) || 5432,
  database: process.env.DATABASE_NAME || 'boardly',
  username: process.env.DATABASE_USERNAME || 'boardly-user',
  password: process.env.DATABASE_PASSWORD || 'boardly-root',
  synchronize: Boolean(process.env.DATABASE_SYNC),
  migrationsRun: Boolean(process.env.DATABASE_MIGRATIONS_RUN),
  logging: false,
  migrations: ['dist/migrations/**/*{.ts,.js}'],
  entities: entities
}

const dataSource = new DataSource(dbConfig)
export default dataSource