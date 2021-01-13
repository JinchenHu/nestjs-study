import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  Type
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) return value;

    // transform js object to typed object
    const object = plainToClass(metatype, value);
    const error = await validate(object);
    if (error.length > 0) {
      throw new BadRequestException('Validation Failed');
    }
    return value;
  }

  private toValidate(metatype: Type<any>): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}
