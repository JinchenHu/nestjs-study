// a basic service with a single method
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  getHello(): string {
    return 'Hello, I am a cat! Mew';
  }

  findOne(id: number): string {
    return `This action returns No.${id} cat`;
  }
}
