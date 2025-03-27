export class DataTransform {
  public toString(value: any, defaultValue: string | null = ''): string | null {
    if (this.isNull(value)) {
      if (this.isNull(defaultValue)) {
        return null
      }

      return defaultValue
    }

    if (this.isUndefined(value)) {
      return defaultValue
    }

    return String(value)
  }

  public toInt(value: any, defaultValue: number = 0): number {
    if (this.isNull(value) || this.isUndefined(value)) {
      return defaultValue
    }

    if (this.isBoolean(value)) {
      return value ? 1 : 0
    }
 
    const numberValue = parseInt(value)
    if (isNaN(numberValue)) {
      return defaultValue
    }

    return numberValue
  }

  public isEmpty(value: string | null): boolean {
    if (value === null) {
      return true
    }

    return !value
  }

  private isBoolean(value: any): boolean {
    return typeof value === 'boolean'
  }

  private isNull(value: any): boolean {
    return value === null
  }

  private isUndefined(value: any): boolean {
    return typeof value === 'undefined'
  }
}