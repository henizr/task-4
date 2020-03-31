import $ from 'jquery';
import jQuery from 'jquery';
import Presenter from './presenter';
import View from './view';
import Model from './model';

import '../src/blocks/slider/slider.scss';


let view: View;
let model: Model;
let presenter: Presenter;


interface sliderOptions{
    [key: string]: string | boolean
}
declare global{
    interface JQuery {
        rangeSlider(options?: sliderOptions): JQuery; 
    }
}

(($)=>{


    $.fn.rangeSlider = function(this: JQuery, options?: sliderOptions) {

        const settings: sliderOptions = $.extend({
            "min": "1", 
            "max": "9",
            "step": "1",
        }, options);

        return this.each(function(){
            view = new View(this);
            model = new Model(settings);
            presenter = new Presenter(view, model);
            presenter.initialize();
        });
    }

})(jQuery);

 
 

$(".js-slider").rangeSlider({
    "min": "1",
    "max": "21",
    "step":"1",
    horizontal: true,
})