export class DataTransform {
  public toString(value: any, defaultValue: string = ''): string | null {
    if (this.isNull(value)) {
      return null
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
 
    const numberValue = parseInt(value)
    if (isNaN(numberValue)) {
      return defaultValue
    }

    return numberValue
  }

  public isEmpty(value: string | null | []): boolean {
    if (value === null) {
      return true
    }

    if (this.isArray(value)) {
      return value.length > 0
    }

    return !value
  }


  private isArray(value: any): boolean {
    return Array.isArray(value)
  }

  private isNull(value: any): boolean {
    return value === null
  }

  private isUndefined(value: any): boolean {
    return typeof value === 'undefined'
  }
}