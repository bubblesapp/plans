import {Plan} from "../models/Plan";

export interface API {
  getPlan(id: string): Promise<Plan>
  addPlan(plan: Plan): Promise<string>
  addEmail(email: string): Promise<void>
}
