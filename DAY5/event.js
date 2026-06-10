// Event in nodejs
// Event is a signal that something has happened in the system. It can be triggered by user actions, system events, or custom events defined by developers. In Node.js, events are handled using the EventEmitter class from the 'events' module.

const EventEmitter = require('events');

// Create an instance of EventEmitter
const eventEmitter = new EventEmitter();

//key methods of EventEmitter class
// 1. on(eventName, listener): This method is used to register a listener for a specific event. The listener will be called whenever the event is emitted.
// 2. emit(eventName, ...args): This method is used to emit an event. It will call all the listeners registered for that event and pass the arguments to them.
// 3. once(eventName, listener): This method is used to register a listener for a specific event that will be called only once. After the event is emitted and the listener is called, it will be removed from the list of listeners for that event.
// 4. removeListener(eventName, listener): This method is used to remove a specific listener for a specific event.
// 5. removeAllListeners(eventName): This method is used to remove all listeners for a specific event.

eventEmitter.on('greet', (name) => {
    console.log(`Hello, ${name}!`);
});

eventEmitter.emit('greet', 'Alice'); // Output: Hello, Alice!