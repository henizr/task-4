import EventObserver from './eventObserver';

export default class Model{
    constructor(private sliderProperties: {[key: string]: string | number |  boolean}, private observer: EventObserver){}
    public getSliderProperties(){
        return this.sliderProperties;
    }
    public updateSliderProperties(sliderProperties: {[key: string]: string | number |  boolean}){
        for(let property of Object.keys(sliderProperties)){
            this.sliderProperties[property] = sliderProperties[property];
        } 
        this.observer.broadcast('model.updated', this.getSliderProperties());
    }
}