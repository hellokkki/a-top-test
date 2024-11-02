import axios from "axios";
import { LoginResponse } from "../../../app/model/user/user";

const url = 'http://80.90.190.26:8081/graphql'

export const login = async (login: string, password: string) => {
    const query = `
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
          organizations {
            id
            name
            users {
              id
              name
              surname
              email
              companies {
                id
                name
              }
            }
            userRoles {
              userCompanyId
              roleId
              role {
                id
                name
              }
            }
          }
        }
      }
    `;
  
    const variables = {
      email: login,
      password: password,
    };
  
    try {
  
      const response = await axios.post<LoginResponse>(url, {
        query, variables
      }, { headers: {
        'Content-Type': 'application/json',
      } })
      const { data } = response;
      console.log(data)
      const { token, organizations } = data.data.login
      const { name, surname } = organizations[0].users[0]

      return { token, name, surname }
  
    } catch (error) {
      console.error("Login error", error);
      throw error;
    }
  };
  