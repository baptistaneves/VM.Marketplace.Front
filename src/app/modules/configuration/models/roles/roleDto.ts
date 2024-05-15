import { ClaimDto } from "./claimDto";

export class RoleDto {
    id: string;
    name: string;
    claims: ClaimDto[];
}
