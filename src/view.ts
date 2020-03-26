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
    public observeAttributesMutation(target: any, broadcastCallback: any){
        const config = {
	    	attributes: true,
		}	
		const callback = function(mutationsList: any, observer: any) {
            
		    for (let mutation of mutationsList) {
                console.log(mutation.type);
		        if (mutation.type === 'attributes') {
		             const dataFromUpdatedAttributes = {
		             	[mutation.attributeName]: target.getAttribute(mutation.attributeName),	
		             	'eventName': 'view-updated-from-outside',	    
		             };
		             broadcastCallback(dataFromUpdatedAttributes);
		        }
		    }
		};
		const observer = new MutationObserver(callback);
		observer.observe(target, config);
    }
}