import $ from 'jquery';
import View from '../view';
import EventObserver from '../eventObserver';

let slider: HTMLDivElement;
let target: any;
let view: View; 
let sliderAttributes: { [key: string]: string };
let updatedAttributes: string;
let eventObserver: EventObserver;


beforeEach(()=>{
    slider = document.createElement('div');
    slider.className = 'js-slider';
    document.body.appendChild(slider);
    
    target = document.querySelector('.js-slider');
    sliderAttributes = {'min': '0', 'max': '9', 'step': '1' };
    eventObserver = new EventObserver();

    view = new View(target);
    view.render(sliderAttributes);
})

describe('Тестирование класса "View"', ()=>{

    
    describe('Тестирование метода "render"', ()=>{
        test('Элемент должен содержать класс "slider"', () => {
            expect(target).toHaveClass("slider");
        });
        
        test('Элемент должен содержать "<div class="slider__track"></div><div class="slider__thumb"></div><div class="slider__hint"></div>"', ()=>{
            expect(target).toContainHTML('<div class="slider__track"></div><div class="slider__thumb"></div><div class="slider__hint"></div>');
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

        const attr = {"min": "5"};

        test("Возвращает объект с обновлёнными атриьутами",()=>{
            view.observeAttributesMutation(target, (attributeName: string)=>{
                eventObserver.broadcast("view.updated-outside", attributeName);
            });
            
            eventObserver.subscribe("view.updated-outside", (attributeName: string)=>{
                updatedAttributes =  attributeName;
                console.log("updatedAttributes " + updatedAttributes);
            });
            
            view.setAttributes(attr);
        })

   });
   
     
});

