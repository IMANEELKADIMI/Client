import { Client } from 'src/app/client/model/client';

export class Account {
  id: number;
  numero: string;
  solde: number;
  client: Client;
}
