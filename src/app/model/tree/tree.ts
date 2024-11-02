

export interface IClassType {
    id: string,
    name: string,
    description: string,
    sort: number,
    code: boolean,
    standart: boolean
}

export interface IFunction {
  id: string,
  name: string,
  description: string,
}

export interface IFunctionClass {
    id: string,
    name: string, 
    description: string,
    children: IFunction[],
}

export interface IFunctionClassType {
    id: string,
    name: string,
    description: string,
    classTypes: IClassType[],
    sort: number,
    children: IFunctionClass[]
}

export type TreeType = IFunctionClassType[];

export type TFetchTreeResponse = {
    data: {
        data: {
            modelTreeClasses: {
                tree: TreeType,
                searched: []
            }
        }
    }
}