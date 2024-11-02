import { IFunction, IFunctionClass, IFunctionClassType } from "../../app/model/tree/tree";
import Checkbox from "antd/es/checkbox/Checkbox";
import "./index.less"

interface IClassDescriptorProps {
    pickedClass: IFunction | IFunctionClass | IFunctionClassType | null
}

export const ClassDescriptor: React.FC<IClassDescriptorProps> = ({ pickedClass }) => {

   return(<div className="class-descriptor">
    <div className="class-descriptor__block">
        <h3 className="class-descriptor__heading">Описание</h3>
        <textarea value={pickedClass !== null ? pickedClass.description : ""} readOnly className="class-descriptor__textarea" />
    </div>
    <div className="class-descriptor__block">
        <h3 className="class-descriptor__heading">Свойства</h3>
        <div className="class-descriptor__props-header">
                <h5>{pickedClass !== null ? pickedClass.name : "Название прибора"}</h5>
                <h5>Значение по умолчанию</h5>

                <h5>Единица измерения</h5>
        </div>
        <div className="class-descriptor__props-body">
                <div className="class-descriptor__line">
                <p className="class-descriptor__line--first-item class-descriptor__text">Давление номинальное</p>
                <p className="class-descriptor__line--second-item class-descriptor__text">{pickedClass !== null ? pickedClass.id : ""}</p>
                <p className="class-descriptor__line--third-item class-descriptor__text">МПа</p>
                </div>
                <div className="class-descriptor__line">
                <p className="class-descriptor__line--first-item class-descriptor__text">Пожаробезопасный</p>
                <Checkbox className="class-descriptor__line--second-item"/>
                </div>
                <div className="class-descriptor__line">
                <p className="class-descriptor__line--first-item class-descriptor__text">Температура среды</p>
                <span className="class-descriptor__line--second-item"></span>
                <p className="class-descriptor__line--third-item class-descriptor__text">℃</p>
                </div>

                <div className="class-descriptor__line">
                <p className="class-descriptor__line--first-item class-descriptor__text">Функциональный признак прибора</p>
                <p className="class-descriptor__line--second-item class-descriptor__text">T</p>
                </div>
 </div>
 </div>

            <div className="class-descriptor__block">
              <h3 className="class-descriptor__heading">Связи</h3>
              <h5>{pickedClass !== null ? pickedClass.name : "Название прибора"}</h5>
              <div className="connections">
                <div className="class-descriptor__line">
                    <Checkbox />
                    <p>Механическое оборудование</p>
                </div>
                <div className="class-descriptor__line">
                    <Checkbox />
                    <p>Механическое оборудование</p>
                </div>
              </div>
            </div>

   </div>)
}