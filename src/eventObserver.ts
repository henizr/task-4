export default class EventObserver{
    public events: {[key: string]: object[]};
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

}