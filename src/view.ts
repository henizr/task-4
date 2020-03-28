export default class View{
    private thumb: HTMLDivElement;
    private track: HTMLDivElement;
    private hint: HTMLDivElement;
    constructor(private slider: any){
        this.slider.classList.add('slider');
        this.track = document.createElement('div');
        this.thumb = document.createElement('div');
        this.hint = document.createElement('div');
        

        this.track.className = 'slider__track';
        this.thumb.className = 'slider__thumb';
        this.hint.className = 'slider__hint';

        this.hint.innerText = "0";
    }
    public render(modelData: {[key: string]: number | string}){
        this.appendComponents([
            this.track,
            this.thumb,
            this.hint,
        ]);

        this.setAttributes(modelData);
    }
    private appendComponents(components: HTMLDivElement[]){
        components.forEach(component=>{
            this.slider.appendChild(component);
        });
        document.body.appendChild(this.slider);
    }
    public setAttributes(sliderAttributes: { [key: string]: number | string }) {
        for (let attribute of Object.keys(sliderAttributes)){
            this.slider.setAttribute(`data-${attribute}`, sliderAttributes[attribute]);
        }
    }
    public getAttributes(){
        return Object.assign({}, this.slider.dataset);
    }
    public observeAttributesMutation(target: any, callback: any){
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