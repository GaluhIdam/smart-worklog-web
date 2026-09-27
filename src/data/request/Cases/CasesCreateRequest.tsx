import type { CasesModel } from "../../model/Cases/Cases.model";

export type CasesCreateRequest = Omit<CasesModel, "id" | "created_at" | "updated_at">;
