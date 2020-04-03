export default class EventObserver{
    public events: {[key: string]: Function[]};
    constructor(){
        this.events = {
            "view.updated.outside": [],
            "view.move.elements": [],
            "model.updated": [],
        };
    }
    public subscribe(eventName: string, callback: Function): void {
        this.events[eventName].push(callback);
        console.log("subscribe" + eventName);
    }
    public unsubscribe(eventName: string, callback: Function): void {
        this.events[eventName] = this.events[eventName].filter(item=>callback!==callback);
    }
    public broadcast(eventName: string, data: {[key: string]: string | number |  boolean}): void {
        this.events[eventName].forEach(callback=>callback(data));
    }
}