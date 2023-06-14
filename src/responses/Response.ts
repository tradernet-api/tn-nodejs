import { Markets } from './Markets';
import { OrderBook } from './OrderBook';
import { Quote } from './Quote';
import {Portfolio} from './Portfolio';
import {Sessions} from './Sessions';

export type Response = Quote & Markets & OrderBook & Portfolio & Sessions;
