export interface VideoInformation {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    official: boolean;
    published_at: string;
    site: string;
    size: number;
    type: string;
}

export class VideoInformationImpl implements VideoInformation{
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    official: boolean;
    published_at: string;
    site: string;
    size: number;
    type: string;
    constructor(){
        this.id= '';
        this.iso_639_1='';
        this.iso_3166_1='';
        this.key='';
        this.name='';
        this.official=false;
        this.published_at='';
        this.site='';
        this.size=0;
        this.type='';
    }
}