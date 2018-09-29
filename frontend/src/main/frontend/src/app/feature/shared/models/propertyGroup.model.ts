import { Base } from './base.model';
import { Address } from "./address.model";

export class PropertyGroup extends Base {
    name: string='';
    title:string;
    type:string;
    numberofFloor:string;
    address: Address;
  }
  

 