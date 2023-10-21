import { SizeType } from './size-type.enum';

export interface ICreateSize {
  name: string;
  order: number;
  type: SizeType;
}
