import { IGroupContainer } from 'src/types/organization_chart/IGroupContainer';
import { IPositionNode } from './IPositionNode';



export interface IPositionItem extends IPositionNode {
    positionType:string;
    parent?:IGroupContainer;
}
