import { Account } from 'src/app/account/model/account';
import { Client } from 'src/app/client/model/client';
import { VirementMulttipleBeneficiare } from './VirementMulttipleBeneficiare';

export class Transfer {
  id: number;
  dateCreation: Date;
  dateExecution: Date;
  mentant: number;
  compte: Account;
  client: Client;
  nombreDeBeneficiare: number;
  status: string;
  virementMultipleBeneficiare: VirementMulttipleBeneficiare;



}
