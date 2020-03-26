export default class Model{
    constructor(private sliderProperties: {[key: string]: string | number}){}
    public getSliderProperties() {
        return this.sliderProperties;
    }
    public updateSliderProperties(sliderProperties: {[key: string]: string | number}){
        for(let property of Object.keys(sliderProperties)){
            this.sliderProperties[property] = sliderProperties[property];
        } 
    }
}