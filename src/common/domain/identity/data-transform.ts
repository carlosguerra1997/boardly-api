export class DataTransform {
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

  private isNull(value: any): boolean {
    return value === null
  }

  private isUndefined(value: any): boolean {
    return typeof value === 'undefined'
  }
}