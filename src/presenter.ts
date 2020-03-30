import View from './view';
import Model from './model';


export default class Presenter{
    constructor(private view: View, private model: Model){}

    public initialize() {
        const modelData = this.model.getSliderProperties();

        this.view.trackConfig = {
            "width": modelData["mode"] === "horizontal"?"100%":"10px",
            "height": modelData["mode"] === "horizontal"?"10px":"350px",
            "left": modelData["mode"] === "horizontal"?"0":"5px",
        };

        this.view.hintConfig = {
            "width": modelData["mode"] === "horizontal"?"30px":"25px",
            "height": modelData["mode"] === "horizontal"?"25px":"35px",
            "left": modelData["mode"] === "horizontal"?"-5px":"35px",
            "top": modelData["mode"] === "horizontal"?"-40px":"-12px",
        };

        this.view.render(modelData);
    }
} 