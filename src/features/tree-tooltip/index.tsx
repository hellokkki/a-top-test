import { useEffect, useState } from "react";
import { useTreeStore } from "../../app/store/treeStore";
import { Input, Select } from "antd";
import SearchIcon from "../../app/assets/search-icon";
import "./index.less"

export const TreeTooltip = () => {
    const [searchWord, setSearchWord] = useState<string>("");
    const { nodesInLibrary, filterTree } = useTreeStore();

    useEffect(() => {
       if (searchWord.length > 0) {
        filterTree(searchWord);
       }
    }, [searchWord, setSearchWord])

    return (
        <div className="tooltip">
        { nodesInLibrary.length > 0 ? 
        <Select 
        mode="multiple"
        placeholder={`В библиотеке +${nodesInLibrary.length}`}
        value={`В библиотеке +${nodesInLibrary.length}`}
        options={ nodesInLibrary.map((key) => ({ label: key.name, value: key.name  })) }
        className="tooltip__select"
        /> :  
        <Select 
        mode="tags"
        placeholder="Пусто"
        value={[]}
        options={[{ label: "пусто", value: "пусто" }]}
        className="tooltip__select"
        />
        }
    { nodesInLibrary.length > 0 ? 
        <Select 
        mode="multiple"
        placeholder={`Присвоенные +${nodesInLibrary.length}`}
        value={`Присвоенные +${nodesInLibrary.length}`}
        options={ nodesInLibrary.map((key) => ({ label: key.name, value: key.name  })) }
        className="tooltip__select"
        /> :  
        <Select 
        mode="tags"
        placeholder="Пусто"
        value={[]}
        options={[{ label: "пусто", value: "пусто" }]}
        className="tooltip__select"
        />
        }

        <Input value={searchWord} onChange={(e) => setSearchWord(e.target.value) } placeholder="Поиск" 
        prefix={SearchIcon()}
        className="tooltip__search"
        />
        </div>
    )
};
