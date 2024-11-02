import { useState, memo, useEffect } from "react";
import Tree from "antd/es/tree/Tree";
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import type { DataNode } from 'antd/es/tree';
import { Key } from "react";

import { transformTreeData } from "../model";
import Button from "../../../shared/ui/Button/index";
import "./index.less"
import { TreeType, IFunction, IFunctionClass, IFunctionClassType } from "../../../app/model/tree/tree";
import { useTreeStore } from "../../../app/store/treeStore";


export const TreeComponent = memo<{
    nodes: TreeType
}>(({ nodes }) => {

    const { selectNode } = useTreeStore();
  
    const [checkedKeys, setCheckedKeys] = useState<Set<string>>(new Set());
    const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

    const handleCheck = (key: string) => {
        const newCheckedKeys = new Set(checkedKeys);
        if (newCheckedKeys.has(key)) {
            newCheckedKeys.delete(key);
        } else {
            newCheckedKeys.add(key);
            selectNode(key);
        }
        setCheckedKeys(newCheckedKeys);
    };
    
    const getAllKeys = (data: TreeType): string[] => {
        const keys: string[] = [];
        
        data.forEach((classType: IFunctionClassType) => {
            keys.push(classType.name);
    
            classType.children.forEach((funcClass: IFunctionClass) => {
                keys.push(`${classType.name}-${funcClass.name}`); 
    
                funcClass.children.forEach((func: IFunction) => {
                    keys.push(`${classType.name}-${funcClass.name}-${func.name}`);
                });
            });
        });
    
        return keys;
    };
    const handleShowAll = () => {
        const allKeys = getAllKeys(nodes);
        setExpandedKeys(allKeys);
    };

    const handleHideAll = () => {
        setExpandedKeys([]);
    };
    
    const treeData = transformTreeData(nodes, checkedKeys, handleCheck);

    const onExpand = (keys: Key[], info: { node: DataNode; expanded: boolean; nativeEvent: MouseEvent }) => {
        setExpandedKeys(keys as string[]);
    };

    useEffect(() => {
       if (expandedKeys.length === 0) {
        handleShowAll()
       } 
    }, [])

  return (
    <div className="tree-container">
        <div className="tree-container__buttons-container">
            <Button text="Свернуть все" handler={handleHideAll}></Button>
            <Button text="Развернуть все" handler={handleShowAll}></Button>
        </div>
        <>
    <Tree
        multiple
        defaultExpandAll={true}
        expandedKeys={expandedKeys}
        onExpand={onExpand}
        selectable={false}
        treeData={treeData}
        showIcon={false}
        switcherIcon={({ expanded }) => (
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
            {expanded ? <DownOutlined /> : <RightOutlined />}
        </span>
        )}
    />
        </>
    </div>)
});
