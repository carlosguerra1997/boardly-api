import { BadRequestException, Injectable, InternalServerErrorException, PipeTransform } from '@nestjs/common'

import { ZodError, ZodSchema } from 'zod'

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor (private readonly schema: ZodSchema<any>) {}

  transform(value: any) {
    try {
      this.schema.parse(value);
      return value
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: 'There was an error validating payload data',
          errors: error.errors.map(error => {
            const { path, message } = error

            return {
              field: path[0],
              error: message
            }
          })
        })
      }
      
      throw new InternalServerErrorException({
        message: 'An unexpected error occurred',
        code: 500
      })
    }
  }
}