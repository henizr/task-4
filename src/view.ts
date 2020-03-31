export default class View{
    private thumb: HTMLDivElement;
    private track: HTMLDivElement;
    private hint: HTMLDivElement;
    public trackConfig: {[key: string]: string};
    public thumbConfig: {[key: string]: string};
    public hintConfig: {[key: string]: string};
    public cursorConfig: {[key: string]: any};
    private mousedownHandler: any;
    private mousemoveHandler: any;
    private mouseupHandler: any;
    
    constructor(private slider: any){
        this.slider.classList.add('slider');
        this.track = document.createElement('div');
        this.thumb = document.createElement('div');
        this.hint = document.createElement('div');
        

        this.track.className = 'slider__track';
        this.thumb.className = 'slider__thumb';
        this.hint.className = 'slider__hint';

        this.hint.innerText = "0";

        this.trackConfig = {};
        this.thumbConfig = {};
        this.hintConfig = {};
        this.cursorConfig = {};

        this.mousedownHandler = this.onMouseDownHandler.bind(this);
        this.mousemoveHandler = this.onMouseMoveHandler.bind(this);
        this.mouseupHandler = this.onMouseUpHandler.bind(this);
        
    }
    public render(modelData: {[key: string]: string | boolean}){
        this.appendComponents([
            this.track,
            this.thumb,
            this.hint,
        ]);
        this.drawElements();
        this.setAttributes(modelData);
        this.bindEvents();
    }
    public drawElements(): void{
        Object.keys(this.trackConfig).forEach((key: any) =>this.track.style[key] = this.trackConfig[key]);
        Object.keys(this.hintConfig).forEach((key: any) =>this.hint.style[key] = this.hintConfig[key]);
        Object.keys(this.thumbConfig).forEach((key: any) =>this.thumb.style[key] = this.thumbConfig[key]);
    }
    private appendComponents(components: HTMLDivElement[]){
        components.forEach(component=>{
            this.slider.appendChild(component);
        });
        document.body.appendChild(this.slider);
    }
    public setAttributes(sliderAttributes: { [key: string]: string | boolean }): void {
        for (let attribute of Object.keys(sliderAttributes)){
            this.slider.setAttribute(`data-${attribute}`, sliderAttributes[attribute]);
        }
    }
    public getAttributes(){
        return Object.assign({}, this.slider.dataset);
    }
    public observeAttributesMutation(target: any, callback: any): void{
        const observer = new MutationObserver((mutationsList)=>{
            for (let mutation of mutationsList) {
                if (mutation.type === 'attributes') {
                    callback(mutation.attributeName);
                }
            }
        });
        const config: {[key: string]: boolean} = { attributes: true }
		observer.observe(target, config);
    } 



    public onMouseDownHandler(){
        //console.log('It is a mousedown event');
        document.addEventListener('mousemove', this.mousemoveHandler);
        document.addEventListener('mouseup', this.mouseupHandler);
    }
    public onMouseMoveHandler(event: any){
        //console.log('It is a mousemove event');
        const page: string = this.cursorConfig["position"];
        const trackPosition: any = this.cursorConfig["positionTrack"];
        this.thumb.style[trackPosition] = event[page].toString() + 'px';

    }
    public onMouseUpHandler(){
        //console.log('It is a mouseup event');
        document.removeEventListener('mouseup', this.mouseupHandler);
        document.removeEventListener('mousemove', this.mousemoveHandler);
    }


    public bindEvents(){
         this.thumb.addEventListener('mousedown', this.mousedownHandler);
    }
}