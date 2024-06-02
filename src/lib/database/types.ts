import { ROLE } from "@/constants";
import { GeneratedAlways } from "kysely";

export interface Database {
  User: UserTable;
  Product: ProductTable;
  Account: AccountTable;
  Session: SessionTable;
  VerificationToken: VerificationTokenTable;
}

export interface UserTable {
  id: GeneratedAlways<string> | string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  role: ROLE;
  created_at: Date;
}

export interface ProductTable {
  id: GeneratedAlways<string> | string;
  mainImage: string;
  images: string[];
  title: string;
  description: string;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface AccountTable {
  id: GeneratedAlways<string> | string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
}

export interface SessionTable {
  id: GeneratedAlways<string> | string;
  userId: string;
  sessionToken: string;
  expires: Date;
}
export interface VerificationTokenTable {
  identifier: string;
  token: string;
  expires: Date;
}
