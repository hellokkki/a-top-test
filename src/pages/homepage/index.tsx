import "./index.less"
import { Space } from "antd"
import { fetchTree } from "../../shared/api/services/tree"
import { useEffect } from "react"
import { useAuthStore } from "../../app/store/auth"
import { useTreeStore } from "../../app/store/treeStore"
import { TreeObserver } from "../../widgets/tree-observer/tree-observer"
import { TreeTooltip } from "../../features/tree-tooltip"


export const Homepage = () => {
  const { user } = useAuthStore();
  const { setTree } = useTreeStore();

  useEffect(() => {
    if (user?.token) {
   fetchTree(user?.token).then((tree) => {
    if (tree) setTree(tree);
   });
   }
  }, [])

  return(
  <div className="homepage">
      <div className="homepage__tooltip">
        <h4 className="homepage__headline">Классы</h4>
        <Space align="start"/>
        <TreeTooltip />
      </div>
      <div className="homepage__tree">
        <TreeObserver />
      </div>
  </div>
  )
}