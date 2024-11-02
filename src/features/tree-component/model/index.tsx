import { Checkbox } from 'antd';
import type { DataNode } from 'antd/es/tree';
import { TreeType, IFunction, IFunctionClass, IFunctionClassType, IClassType } from '../../../app/model/tree/tree';


const removeDuplicates = (data: TreeType): TreeType => {
    const seen = new Set<string>();

    const filterNode = (node: IFunctionClassType | IFunctionClass | IFunction | IClassType): boolean => {
        if (seen.has(node.name)) {
            return false; // Skip if the node is already seen
        }
        seen.add(node.name);
        return true;
    };

    const filterChildren = (nodes: IFunctionClass[]): IFunctionClass[] => {
        return nodes
            .filter(filterNode)
            .map((funcClass) => ({
                ...funcClass,
                children: funcClass.children.filter(filterNode), // Filter `IFunction` duplicates
            }));
    };

    const filterClassTypes = (classTypes: IClassType[]): IClassType[] => {
        return classTypes.filter(filterNode); // Filter `IClassType` duplicates
    };

    // Main function to filter IFunctionClassType
    return data
        .filter(filterNode)
        .map((classType) => ({
            ...classType,
            children: filterChildren(classType.children),
            classTypes: filterClassTypes(classType.classTypes),
        }));
};


export const transformTreeData = (
    data: TreeType,
    checkedKeys: Set<string>,
    onCheck: (key: string) => void
): DataNode[] => {
    const cleanData = removeDuplicates(data);
    
    return cleanData.map((classType: IFunctionClassType) => ({
        title: (
            <Checkbox
                checked={checkedKeys.has(classType.name)}
                onChange={() => onCheck(classType.name)}
                style={{ fontWeight: 'bold' }}
            >
                {classType.name}
            </Checkbox>
        ),
        key: classType.name,
        children: [
            ...classType.children.map((funcClass: IFunctionClass) => ({
                title: (
                    <Checkbox
                        checked={checkedKeys.has(funcClass.name)}
                        onChange={() => onCheck(funcClass.name)}
                        style={{ paddingLeft: '20px', fontWeight: '500' }}
                    >
                        {funcClass.name}
                    </Checkbox>
                ),
                key: `${classType.name}-${funcClass.name}`,
                children: funcClass.children.map((func: IFunction) => ({
                    title: (
                        <Checkbox
                            checked={checkedKeys.has(func.name)}
                            onChange={() => onCheck(func.name)}
                            style={{ paddingLeft: '40px' }}
                        >
                            {func.name}
                        </Checkbox>
                    ),
                    key: `${classType.name}-${funcClass.name}-${func.name}`,
                    isLeaf: true, // Functions are leaf nodes
                })),
            })),
            ...classType.classTypes.map((cls: IClassType) => ({
                title: (
                    <Checkbox
                        checked={checkedKeys.has(cls.name)}
                        onChange={() => onCheck(cls.name)}
                        style={{ paddingLeft: '20px' }}
                    >
                        {cls.name}
                    </Checkbox>
                ),
                key: `${classType.name}-${cls.name}`,
                isLeaf: true, // IClassType nodes are also leaf nodes
            })),
        ],
    }));
};
