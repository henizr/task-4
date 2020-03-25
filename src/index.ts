import $ from 'jquery';
import jQuery from 'jquery';


import '../src/blocks/slider/slider.scss';


interface sliderOptions{
    min: number;
    max: number;
    step: number;
}
declare global{
    interface JQuery {
        rangeSlider(options?: sliderOptions): JQuery; 
    }
}

(($)=>{

    $.fn.rangeSlider = function(this: JQuery, options?: sliderOptions){

        const setting: sliderOptions = {
            min: 0,
            max: 9,
            step: 1,
        };

        return this.each(function(){
             
        });
    }

})(jQuery);

 
 

