import { ClassDescriptor } from "../../features/class-descriptor";
import { TreeComponent } from "../../features/tree-component/ui"
import { useTreeStore } from "../../app/store/treeStore"
import "./tree-observer.less"

export const TreeObserver = () => {
    const { tree, selectedNode, filteredTree } = useTreeStore();

    return (
    <div className="observer-container">
      <TreeComponent nodes={filteredTree.length > 0 ?  filteredTree : tree } />
      <ClassDescriptor pickedClass={selectedNode}/>
    </div>
    )
}