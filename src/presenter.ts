import View from './view';
import Model from './model';


export default class Presenter{
    constructor(private view: View, private model: Model){}

    public initialize() {
        const modelData = this.model.getSliderProperties();

        this.view.render(modelData);
    }
} 