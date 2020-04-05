import EventObserver from './eventObserver';

export default class View{
    private thumbFirst: HTMLDivElement;
    private thumbSecond: HTMLDivElement;
    private track: HTMLDivElement;
    private hint: HTMLDivElement;

    private shiftX: number;
    private shiftY: number;

    constructor(private slider: HTMLElement, private observer: EventObserver){
        this.slider.classList.add('slider');
        this.track = document.createElement('div');
        this.thumbFirst = document.createElement('div');
        this.thumbSecond = document.createElement('div');
        this.hint = document.createElement('div');
        

        this.track.className = 'slider__track';
        this.thumbFirst.className = 'slider__thumb';
        this.thumbSecond.className = 'slider__thumb'
        this.hint.className = 'slider__hint';

        this.shiftX = 0;
        this.shiftY = 0;
    }
    public render(){
        this.slider.appendChild(this.track);
        this.slider.appendChild(this.thumbFirst);
        //this.slider.appendChild(this.thumbSecond);
        this.slider.appendChild(this.hint); 
        


        this.bindMethods();
        this.bindEvents();
    }
    public drawElements(data: {[key: string]: string | number |  boolean}): void{
        const { mode, from, min, max, hint } = data;
        const thumbOrintation: string = mode==="horizontal"?"left":"top";
        this.thumbFirst.style.setProperty(thumbOrintation, from + 'px');

        this.hint.innerText = "0";

        if(mode!=="horizontal"){
                this.hint.classList.add('slider__hint_vertical');
                this.track.classList.add('slider__track_vertical');
                this.slider.classList.add('slider_vertical');
        }else{
                this.hint.classList.remove('slider__hint_vertical');
                this.track.classList.remove('slider__track_vertical');
                this.slider.classList.remove('slider_verical');
        }

        if(hint){
            this.hint.style.setProperty("display", "flex");
        } else{
            this.hint.style.setProperty("display", "none");
        }

    }

    public slideElements(modelData: {[key: string]: string | number | boolean}){
        const { mode, min, max, x, y} = modelData;
        const elementsOrintation: string = mode==="horizontal"?"left":"top";
        let from  = (mode==="horizontal"?x:y);
        //вычисления

        if(from < 0){
            from = 0;
        }

        let to; 

        if(mode==="horizontal"){
            to = (this.track.offsetWidth - this.thumbFirst.offsetWidth) + 25;
        } else{
            to = this.track.offsetHeight - this.thumbFirst.offsetHeight + 25;
        }

        if(from > to){
            from = to;
        }

     
        let hintShift: number;
        let currentStateInPercent: number;
        if(mode==="horizontal"){
            currentStateInPercent = (Number(from) * 100) / this.slider.offsetWidth;
            hintShift = 3.6;
        } else{
                currentStateInPercent = (Number(from) * 100) / this.slider.offsetHeight;
                hintShift = 1;
        }
 
        const hintText = Math.floor((Number(max) * currentStateInPercent) / 100);  

        this.thumbFirst.style.setProperty(elementsOrintation, (currentStateInPercent) + '%');
        this.hint.style.setProperty(elementsOrintation, (currentStateInPercent-hintShift) + '%');
        this.hint.innerHTML = hintText.toString()
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

    private onMouseDownHandler(event: MouseEvent){
      
        
        this.shiftX = event.clientX - this.thumbFirst.getBoundingClientRect().left;
        this.shiftY = event.clientY - this.thumbFirst.getBoundingClientRect().top;

        document.addEventListener('mousemove', this.onMouseMoveHandler);
        document.addEventListener('mouseup', this.onMouseUpHandler);
    }
    private onMouseMoveHandler(event: MouseEvent){
        event.preventDefault();

        const thumbXCoordinate: number = event.clientX - this.shiftX - this.track.getBoundingClientRect().left;
        const thumbYCoordinate: number = event.clientY - this.shiftY -  this.track.getBoundingClientRect().top;

        this.observer.broadcast('view.move.elements', {x: Math.floor(thumbXCoordinate), y: Math.floor(thumbYCoordinate)});
    }
    private onMouseUpHandler(event: MouseEvent){
         
        document.removeEventListener('mouseup', this.onMouseUpHandler);
        document.removeEventListener('mousemove', this.onMouseMoveHandler);
    }

    private bindMethods(){
        this.onMouseDownHandler = this.onMouseDownHandler.bind(this);
        this.onMouseMoveHandler = this.onMouseMoveHandler.bind(this);
        this.onMouseUpHandler = this.onMouseUpHandler.bind(this);
    }

    private bindEvents(){
        this.thumbFirst.addEventListener('mousedown', this.onMouseDownHandler);
        this.thumbFirst.ondragstart = function() {
            return false;
          };
    }
}