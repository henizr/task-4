import $ from 'jquery';
import View from '../view';
let slider: HTMLDivElement;
let target: any;
let view: View;
let sliderAttributes: { [key: string]: number | string };
let updatedAttributes: { [key: string]: number | string };

beforeEach(()=>{
    slider = document.createElement('div');
    slider.className = 'js-slider';
    document.body.appendChild(slider);
    
    target = document.querySelector('.js-slider');
    sliderAttributes = {'min': '0', 'max': '9', 'step': '1' };

    view = new View(target);
    view.render(sliderAttributes);
})

describe('Тестирование класса "View"', ()=>{

    
    describe('Тестирование метода "render"', ()=>{
        test('Элемент должен содержать класс "slider"', () => {
            expect(target).toHaveClass("slider");
        });
        
        test('Элемент должен содержать "<div class="slider__thumb"></div>"', ()=>{
            expect(target).toContainHTML('<div class="slider__thumb"></div>');
        });
    });
    describe('Тестирование метода "setAttributes"', ()=>{
        test("Должен установить атрибуты из шаблона 'sliderAttributes'", ()=>{
            for (let attribute of Object.keys(sliderAttributes)){
                expect(target.getAttribute(`data-${attribute}`)).toBe(sliderAttributes[attribute]);
            }
         });
    });
    describe('Тестирование метода "getAttributes"', ()=>{
         test("Должен вернуть объект с атрибутами из шаблона 'sliderAttributes'", ()=>{
            expect(view.getAttributes()).toEqual(sliderAttributes);
         });
    });
    
    describe('Тестирование метода "observeAttributesMutation"', ()=>{

        test("Возвращает объект с обновлёнными атриьутами",()=>{
            view.observeAttributesMutation(target, (dataFromUpdatedAttributes: { [kay: string]: string })=>{
                console.log(dataFromUpdatedAttributes);
            });
            //view.setAttributes({"min": "10"});
             
        })

   });
   
     
});

