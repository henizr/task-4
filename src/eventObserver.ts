export default class EventObserver{
    public events: {[key: string]: any[]};
    constructor(){
        this.events = {
            "view-updated-from-outside": [],
        };
    }
    public subscribe(eventName: string, callback: object): void {
        this.events[eventName].push(callback);
    }
    public unsubscribe(eventName: string, callback: object): void {
        this.events[eventName] = this.events[eventName].filter(item=>callback!==callback);
    }
    public broadcast(eventName: string, data: string): void {
        this.events[eventName].forEach(callback=>callback(data));
    }
}