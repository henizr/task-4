export default class Model{
    constructor(private sliderProperties: {[key: string]: string}){}
    public getSliderProperties() {
        return this.sliderProperties;
    }
    public updateSliderProperties(sliderProperties: {[key: string]: string}){
        for(let property of Object.keys(sliderProperties)){
            this.sliderProperties[property] = sliderProperties[property];
        } 
    }
}