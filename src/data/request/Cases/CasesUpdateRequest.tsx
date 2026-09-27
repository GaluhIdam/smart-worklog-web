import type { CasesModel } from "../../model/Cases/Cases.model";

export type CasesUpdateRequest = Omit<CasesModel, "created_at" | "updated_at">;
