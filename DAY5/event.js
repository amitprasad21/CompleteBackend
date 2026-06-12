/**
 * ============================================================
 * EVENT EMITTER IN NODE.JS - COMPLETE GUIDE
 * ============================================================
 *
 * An Event is a signal that something has happened.
 *
 * Examples:
 * - User logged in
 * - File uploaded
 * - Order placed
 * - Database connected
 * - Payment completed
 *
 * Node.js uses an Event-Driven Architecture.
 * Many built-in modules like:
 * - HTTP
 * - Streams
 * - File System
 * - Process
 * internally use EventEmitter.
 */

const EventEmitter = require('events');

/**
 * Create an EventEmitter instance
 */
const emitter = new EventEmitter();

/* ============================================================
   1. on() - Register an Event Listener
   ============================================================

   Syntax:
   emitter.on(eventName, callback)

   Used when we want the listener to execute
   every time the event occurs.
*/

emitter.on('userLogin', (username) => {
    console.log(`${username} logged in.`);
});

emitter.emit('userLogin', 'Amit');
emitter.emit('userLogin', 'Rahul');

/*
Output:
Amit logged in.
Rahul logged in.
*/


/* ============================================================
   2. emit() - Trigger an Event
   ============================================================

   Syntax:
   emitter.emit(eventName, data)

   Used to fire an event.

   Returns:
   true  -> if listeners exist
   false -> if no listener exists
*/

const result = emitter.emit('userLogin', 'Neha');
console.log('Event emitted:', result);


/* ============================================================
   3. once() - Execute Only One Time
   ============================================================

   Listener automatically removes itself
   after first execution.
*/

emitter.once('appStart', () => {
    console.log('Application Started');
});

emitter.emit('appStart');
emitter.emit('appStart');

/*
Output:
Application Started
*/


/* ============================================================
   4. Multiple Listeners for Same Event
   ============================================================

   Multiple callbacks can listen
   to the same event.
*/

emitter.on('orderPlaced', (orderId) => {
    console.log(`Order Created: ${orderId}`);
});

emitter.on('orderPlaced', (orderId) => {
    console.log(`Sending Email for Order ${orderId}`);
});

emitter.on('orderPlaced', (orderId) => {
    console.log(`Updating Inventory for Order ${orderId}`);
});

emitter.emit('orderPlaced', 101);

/*
Output:
Order Created: 101
Sending Email for Order 101
Updating Inventory for Order 101
*/


/* ============================================================
   5. Passing Multiple Arguments
   ============================================================
*/

emitter.on('paymentSuccess', (user, amount, method) => {
    console.log(
        `${user} paid ₹${amount} using ${method}`
    );
});

emitter.emit(
    'paymentSuccess',
    'Amit',
    5000,
    'UPI'
);


/* ============================================================
   6. removeListener()
   ============================================================

   Removes a specific listener.
*/

function welcomeUser(name) {
    console.log(`Welcome ${name}`);
}

emitter.on('welcome', welcomeUser);

emitter.emit('welcome', 'Amit');

emitter.removeListener('welcome', welcomeUser);

emitter.emit('welcome', 'Amit');

/*
Second emit will not execute anything.
*/


/* ============================================================
   7. off()
   ============================================================

   Modern alias of removeListener().
*/

function logoutHandler(user) {
    console.log(`${user} logged out`);
}

emitter.on('logout', logoutHandler);

emitter.off('logout', logoutHandler);


/* ============================================================
   8. removeAllListeners()
   ============================================================

   Removes all listeners of a specific event.
*/

emitter.on('test', () => console.log('Listener 1'));
emitter.on('test', () => console.log('Listener 2'));

console.log(
    'Before:',
    emitter.listenerCount('test')
);

emitter.removeAllListeners('test');

console.log(
    'After:',
    emitter.listenerCount('test')
);


/* ============================================================
   9. listenerCount()
   ============================================================

   Returns total listeners for an event.
*/

emitter.on('message', () => {});
emitter.on('message', () => {});

console.log(
    emitter.listenerCount('message')
);

/*
Output:
2
*/


/* ============================================================
   10. listeners()
   ============================================================

   Returns array of listeners.
*/

const listeners = emitter.listeners('message');

console.log(listeners);


/* ============================================================
   11. eventNames()
   ============================================================

   Returns all registered event names.
*/

console.log(
    emitter.eventNames()
);


/* ============================================================
   12. prependListener()
   ============================================================

   Adds listener at beginning.

   Executes before existing listeners.
*/

emitter.on('task', () => {
    console.log('Normal Listener');
});

emitter.prependListener('task', () => {
    console.log('Priority Listener');
});

emitter.emit('task');

/*
Output:
Priority Listener
Normal Listener
*/


/* ============================================================
   13. prependOnceListener()
   ============================================================

   One-time listener added at beginning.
*/

emitter.prependOnceListener('startup', () => {
    console.log('Runs First Only Once');
});

emitter.emit('startup');
emitter.emit('startup');


/* ============================================================
   14. Error Event (IMPORTANT)
   ============================================================

   Best practice:
   Always handle "error" events.

   If error event is emitted and
   no listener exists, Node.js crashes.
*/

emitter.on('error', (err) => {
    console.error(
        'Error Handled:',
        err.message
    );
});

emitter.emit(
    'error',
    new Error('Database Connection Failed')
);


/* ============================================================
   15. setMaxListeners()
   ============================================================

   Default max listeners = 10

   Prevents memory leak warnings.
*/

emitter.setMaxListeners(20);

console.log(
    emitter.getMaxListeners()
);


/* ============================================================
   16. Real-World Example
   ============================================================

   E-Commerce Order System
*/

const orderEmitter = new EventEmitter();

/**
 * Save Order
 */
orderEmitter.on('orderCreated', (order) => {
    console.log(
        `Order ${order.id} saved in DB`
    );
});

/**
 * Send Email
 */
orderEmitter.on('orderCreated', (order) => {
    console.log(
        `Email sent to ${order.email}`
    );
});

/**
 * Update Inventory
 */
orderEmitter.on('orderCreated', (order) => {
    console.log(
        `Inventory updated for product ${order.product}`
    );
});

/**
 * Analytics Tracking
 */
orderEmitter.on('orderCreated', (order) => {
    console.log(
        `Analytics tracked for Order ${order.id}`
    );
});

/**
 * Trigger Event
 */
orderEmitter.emit('orderCreated', {
    id: 1001,
    email: 'amit@gmail.com',
    product: 'Laptop'
});


/* ============================================================
   17. Custom Class Using EventEmitter
   ============================================================

   Very common interview question.
*/

class ChatRoom extends EventEmitter {
    sendMessage(user, message) {
        this.emit('message', {
            user,
            message
        });
    }
}

const room = new ChatRoom();

room.on('message', (data) => {
    console.log(
        `${data.user}: ${data.message}`
    );
});

room.sendMessage(
    'Amit',
    'Hello Everyone!'
);


/* ============================================================
   INTERVIEW QUESTIONS
   ============================================================

   Q1. What is EventEmitter?
   -> Core Node.js class used to create and handle events.

   Q2. Difference between on() and once()?
   -> on() executes every time.
   -> once() executes only once.

   Q3. What does emit() do?
   -> Triggers an event.

   Q4. Why use EventEmitter?
   -> Decoupled communication between modules.

   Q5. What happens if error event is not handled?
   -> Application crashes.

   Q6. How to remove listeners?
   -> removeListener(), off(), removeAllListeners()

   Q7. How to count listeners?
   -> listenerCount()

   Q8. Real-world use cases?
   -> Authentication
   -> Notifications
   -> Chat Applications
   -> Order Processing
   -> Payment Systems
   -> Logging Systems
   -> File Upload Systems

============================================================
SUMMARY OF IMPORTANT METHODS
============================================================

on()                    -> Register listener
once()                  -> Register one-time listener
emit()                  -> Trigger event
off()                   -> Remove listener
removeListener()        -> Remove specific listener
removeAllListeners()    -> Remove all listeners
listenerCount()         -> Count listeners
listeners()             -> Get listeners
eventNames()            -> Get event names
prependListener()       -> Add listener at beginning
prependOnceListener()   -> Add one-time listener first
setMaxListeners()       -> Set listener limit
getMaxListeners()       -> Get listener limit

============================================================
*/