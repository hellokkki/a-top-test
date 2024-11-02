import axios from "axios";
import { TFetchTreeResponse } from "../../../app/model/tree/tree";

const url = 'http://80.90.190.26:8081/graphql'

const query = `
  query {
    modelTreeClasses {
      tree {
        id
        name
        description
        sort
        classTypes {
          id
          name
          description
          sort
          standard
          code
        }
        children {
          id
          name
          description
          children {
            id
            name
            description
          }
        }
      }
      searched
    }
  }
`;

export const fetchTree = async (token: string) => {
   try {
     const response = await axios.post(url, {
      query
     }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
     })
     const { data } = response as TFetchTreeResponse
     const { tree }  = data.data.modelTreeClasses
     return tree
   } catch (error) {
    console.log(error)
   }
}