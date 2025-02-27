import { Configuration } from '@/config/Configuration'
import { getDevConfig } from '@/config/environments/dev'

export default () => {
  const { APP_ENV = 'dev' } = process.env

  let config: Configuration
  switch (APP_ENV) {
    default:
      config = getDevConfig()
  }

  return config
}