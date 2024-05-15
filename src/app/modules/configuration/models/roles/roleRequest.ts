import { ClaimRequest } from "./claimRequest";

export class RoleRequest {
    id:string;
    name:string;
    claims: ClaimRequest[];
}