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
          message: 'Message',
          error: 'Error'
        })
      }
      
      throw new InternalServerErrorException({
        message: 'Message',
        error: 'Error'
      })
    }
  }
}