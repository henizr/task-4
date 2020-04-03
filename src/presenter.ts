import View from './view';
import Model from './model';
import EventObserver from './eventObserver';

export default class Presenter{
    constructor(private view: View, private model: Model, private observer: EventObserver){

    }

    public initialize() {
        this.view.render();

        const data = this.model.getSliderProperties();

        this.view.drawElements(data);

        this.bindEvents();
    }
    private bindEvents(){
        this.observer.subscribe('view.move.elements', (data: {[key: string]: string | number |  boolean})=>{
            this.model.updateSliderProperties(data);
        });
        this.observer.subscribe('model.updated', (data: {[key: string]: string | number |  boolean})=>{
            this.view.slideElements(data);
        });
    }
} 