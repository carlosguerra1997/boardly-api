import { Configuration } from '@/config/Configuration'
import { getBaseConfig } from '@/config/environments/base'

export const getDevConfig = (): Configuration => {
  const baseConfig = getBaseConfig()

  return { ...baseConfig }
}