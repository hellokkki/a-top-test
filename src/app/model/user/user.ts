// Define the structure of the Role type
interface Role {
    id: string;
    name: string;
  }
  
  // Define the structure of UserRole type
  interface UserRole {
    userCompanyId: string;
    roleId: string[];
    role: Role[];
  }
  
  // Define the structure of Company type
  interface Company {
    id: string;
    name: string;
  }
  
  // Define the structure of User type
  interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    companies: Company[];
  }
  
  // Define the structure of Organization type
  interface Organization {
    id: string;
    name: string;
    users: User[];
    userRoles: UserRole[];
  }
  
  export interface LoginResponse {
    data: {
    login: {
    token: string;
    organizations: Organization[];
    }
    }
  }
  

export type IUser = {
    token: string,
    name: string, 
    surname: string
}

export interface IUserStore {
    user: IUser | null;
    setUserInfo: (user: IUser) => void;
    clearUserInfo: () => void;
}