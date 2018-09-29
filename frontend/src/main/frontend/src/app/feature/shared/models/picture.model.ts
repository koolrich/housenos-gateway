import { Base } from './base.model';
import {SafeUrl } from '@angular/platform-browser';
export interface Picture  {
    name: string;
    caption: string;
    file:File;
    //src:SafeUrl;
    url: string

    //display_order:number;
    
}
export class PictureImage   extends Base {
    id: string;
    propertyId: string;
    pictures:Picture;
    
    constructor(id,propertyId,picture){
        super();
    }
    
}