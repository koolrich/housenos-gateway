import { Base } from './base.model';
import {Address} from "./address.model";
import {Picture} from "./picture.model";
export class Property extends Base{
        type: string;
        name:string
        title: string;
        status : string;
        address: Address;
        
 

    constructor(property:Property){
        super();
        if(property){
            this.id=property.id;
            this.type=property.type;
            this.title=property.title;
            this.status=property.status;
            this.address= new Address();
            
        }    
    
    }

   
}

export class Property2 {

    type: string;
    name:string
    title: string;
    status : string;
    address: Address;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}