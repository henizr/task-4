import $ from 'jquery';
import jQuery from 'jquery';
import Presenter from './presenter';
import View from './view';
import Model from './model';
import EventObserver from './eventObserver';

import '../src/blocks/slider/slider.scss';



interface sliderOptions{
    [key: string]: string | number |  boolean;
}
declare global{
    interface JQuery {
        rangeSlider(options?: sliderOptions): JQuery; 
    }
}

(($)=>{


    $.fn.rangeSlider = function(this: JQuery, options?: sliderOptions) {

        const settings: sliderOptions = $.extend({
            mode: '',
            from: 0,
            min: 1,
            max: 10,
        }, options);

        return this.each(function(){
            const observer = new EventObserver();
            const view = new View(this, observer);
            const model = new Model(settings, observer);
            const presenter = new Presenter(view, model, observer);
            presenter.initialize();
        });
    }

})(jQuery);

 
 

$(".js-slider").rangeSlider({
    mode: 'vertical', // horizontal / vertical
    from: 0,
    min: 0,
    max: 20,
    hint: true,
})