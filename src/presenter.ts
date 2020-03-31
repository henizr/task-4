import View from './view';
import Model from './model';


export default class Presenter{
    constructor(private view: View, private model: Model){}

    public initialize() {
        const modelData = this.model.getSliderProperties();

        this.view.trackConfig = {
            "width": modelData["horizontal"]?"100%":"10px",
            "height": modelData["horizontal"]?"10px":"350px",
            "left": modelData["horizontal"]?"0":"5px",
        };
        this.view.hintConfig = {
            "width": modelData["horizontal"]?"30px":"25px",
            "height": modelData["horizontal"]?"25px":"35px",
            "left": modelData["horizontal"]?"-5px":"35px",
            "top": modelData["horizontal"]?"-40px":"-12px",
        };
        this.view.thumbConfig = {
            "left": modelData["horizontal"]?"0":"0",
            "top": modelData["horizontal"]?"-5px":"-5px",
        };
        this.view.cursorConfig = {
            position: modelData["horizontal"]?"pageX":"pageY",
            positionTrack: modelData["horizontal"]?"left":"top",
        };

        this.view.render(modelData);
    }
} 