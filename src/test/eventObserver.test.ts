import EventObserver from '../eventObserver';

let observer: EventObserver;
let callback: object;
let answer: string;

beforeEach(()=>{
    observer = new EventObserver();
    callback = (message: string)=> answer = message;
    observer.subscribe('view.updated-outside', callback);
});


describe('Тестирование класса "EventObserver"', ()=>{
    test('Метод "subscribe" должен сохранить в объекте "events" имя события и callback', ()=>{
        expect(observer.events['view.updated-outside']).toEqual([callback]);
    });
    test('Метод "unsubscribe" должен удалить из объекта "events" callback по имени события', ()=>{
        observer.unsubscribe('view.updated-outside', callback);
        expect(observer.events['view.updated-outside']).toEqual([]);
    });
    test('Метод "broadcast" должен посылать широковещательное сообщение всем подписчикам', ()=>{
        observer.broadcast('view.updated-outside', 'It is a message');
        expect(answer).toEqual('It is a message');
    });
});