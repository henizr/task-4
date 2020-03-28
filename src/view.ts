export default class View{
    private thumb: HTMLDivElement;
    constructor(private slider: any){
        this.slider.className = 'slider';
        this.thumb = document.createElement('div');
        this.thumb.className = 'slider__thumb';
    }
    public render(modelData: {[key: string]: number | string}){
        this.slider.appendChild(this.thumb);

        document.body.appendChild(this.slider);

        this.setAttributes(modelData);
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