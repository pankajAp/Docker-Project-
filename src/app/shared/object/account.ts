export class Account {
  account_id: number;
  account_no: string;
  account_branch: string;
  account_ifsc: string;
  account_org_id: number;
  account_user_id: number;

  constructor(json?: any) {
    if (json != null) {
      this.account_id = json.account_id;
      this.account_no = json.account_no;
      this.account_branch = json.account_branch;
      this.account_ifsc = json.account_ifsc;
      this.account_org_id = json.account_org_id;
      this.account_user_id = json.account_user_id;

    }
  }
}
