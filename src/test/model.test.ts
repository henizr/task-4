import Model from '../model';

let sliderProperties: {[key: string]: string | number};
let model: Model;
let updatedSliderProperties: {[key: string]: string | number};

beforeEach(()=>{
    sliderProperties = {'min': '0', 'max': '9', 'step': '1' };
    updatedSliderProperties = {'max': '11', 'step': '5' };
    model = new Model(sliderProperties);
});

describe('Тестирование методов класса "Model"', ()=>{
    test('Метод "getSliderProperties" должен вернуть оъект со свойствами, который эквивалентен шаблону "sliderProperties"', ()=>{
        expect(model.getSliderProperties()).toEqual(sliderProperties);
    });
    test('Метод "updateSliderProperties" должен обновить свойства слайдера', ()=>{
        model.updateSliderProperties(updatedSliderProperties);
        expect(model.getSliderProperties()).toEqual({'min': '0', 'max': '11', 'step': '5' });
    });
});

