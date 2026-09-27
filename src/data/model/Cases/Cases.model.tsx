import type { MemberModel } from "../Member.model";

export interface CasesModel {
  id: number;
  case_number: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  pics: MemberModel[];
  members: MemberModel[];
  created_at: Date;
  updated_at: Date;
}
