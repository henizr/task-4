export default class View{
    private thumb: HTMLDivElement;
    private track: HTMLDivElement;
    private hint: HTMLDivElement;
    public trackConfig: {[key: string]: string};
    public hintConfig: {[key: string]: string};
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
        this.hintConfig = {};
    }
    public render(modelData: {[key: string]: string}){
        this.appendComponents([
            this.track,
            this.thumb,
            this.hint,
        ]);
        this.drawElement();
        this.setAttributes(modelData);
    }
    public drawElement(): void{
        Object.keys(this.trackConfig).forEach((key: any) =>this.track.style[key] = this.trackConfig[key]);
        Object.keys(this.hintConfig).forEach((key: any) =>this.hint.style[key] = this.hintConfig[key]);
    }
    private appendComponents(components: HTMLDivElement[]){
        components.forEach(component=>{
            this.slider.appendChild(component);
        });
        document.body.appendChild(this.slider);
    }
    public setAttributes(sliderAttributes: { [key: string]: number | string }): void {
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
}