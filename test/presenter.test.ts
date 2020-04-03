import Presenter from '../presenter';
import View from '../view';
import Model from '../model';

let target: HTMLDivElement | null;

describe("Тестирование методов класса 'Presenter'", ()=>{
    beforeEach(()=>{
        const slider = document.createElement('div');
        slider.className = 'js-slider';
        document.body.appendChild(slider);
    
        const sliderProperties: {[key: string]: string} = {
            min: "0",
            max: "11",
            step: "1",
        };
        const view = new View(slider);
        const model = new Model(sliderProperties);
        const presenter = new Presenter(view, model);
        presenter.initialize();
    
        target = document.querySelector('.js-slider');
    });
    test("Метод 'initialize' должен отбразить слайдер в dom дереве", ()=>{
        expect(target).toHaveClass('slider');
    });
});