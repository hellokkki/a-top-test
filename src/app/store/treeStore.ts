import { create } from "zustand";
import { TreeType, IFunction, IFunctionClass, IFunctionClassType } from "../model/tree/tree";

interface TreeStoreState {
    tree: TreeType;
    filteredTree: TreeType;
    selectedNode: IFunction | IFunctionClass | IFunctionClassType | null;
    nodesInLibrary: (IFunction | IFunctionClass | IFunctionClassType)[];
    setTree: (newTree: TreeType) => void;
    selectNode: (className: string) => IFunction | IFunctionClass | null;
    filterTree: (searchTerm: string) => void;
}

export const useTreeStore = create<TreeStoreState>((set, get) => ({
    tree: [],
    filteredTree: [],
    selectedNode: null,
    nodesInLibrary: [],
    
    setTree: (newTree) => set(() => ({ tree: newTree })),
    selectNode: (className) => {
        const findFunc = (tree: TreeType): IFunction | IFunctionClass | IFunctionClassType | null => {
          for (const node of tree) {
           if (className === node.name) return node;
           for (const classType of node.classTypes) {
            if (className === classType.name) return classType;
           }
           for (const child of node.children) {
            if (className === child.name) return child;
            for (const kid of child.children) {
              if (className === kid.name) return kid
            }
           }
        };
        return null
      };
      const selectedFunc = findFunc(useTreeStore.getState().tree);

      if (selectedFunc !== null) set({ nodesInLibrary: [...useTreeStore.getState().nodesInLibrary, selectedFunc ]});

      set({ selectedNode: selectedFunc });
      return selectedFunc;
},

filterTree: (searchTerm) => {
  const filterNodes = (nodes: TreeType): TreeType => 
      nodes.reduce<TreeType>((acc, node) => {
          // Check if node or its children match the search term
          if (
              node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              node.classTypes.some(classType =>
                  classType.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) ||
              node.children.some(child => 
                  child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  child.children.some(kid => 
                      kid.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
              )
          ) {
              // Deep copy node and only keep matching children
              const matchedNode = { ...node }
              matchedNode.classTypes = node.classTypes.filter(classType =>
                  classType.name.toLowerCase().includes(searchTerm.toLowerCase())
              );
              matchedNode.children = node.children
                  .map(child => ({
                      ...child,
                      children: child.children.filter(kid =>
                          kid.name.toLowerCase().includes(searchTerm.toLowerCase())
                      ),
                  }))
                  .filter(child =>
                      child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      child.children.length > 0
                  );
              acc.push(matchedNode);
          }
          return acc;
      }, []);

  set({ filteredTree: filterNodes(get().tree) });
},
}))
