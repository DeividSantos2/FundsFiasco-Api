import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getObject(): any {
    let obj = {
      id: 1,
      name: 'Deivid',
      idade: 19
    }
    return obj;
    } 
}
