import { TStore } from "../src/interfaces/stores.interfaces";
import { TUser, TUserPermissions } from "../src/interfaces/users.interfaces";

declare global {
    namespace Express {
        interface Response {
            locals: {
                found?: TUser | TStore; 
                credentials?: { id: number, permission: TUserPermissions}; 
            };
        }
    }
}