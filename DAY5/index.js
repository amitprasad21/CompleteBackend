// !Objective 
// CREATE A PROGRAM USING NODE.JS EVENTMITER THAT :

// ? LISTENS FOR MULTIPLE TYPES OF USER EVENTS(E.G LOGIN, LOGOUT, PURCHASE, PROGILE UPDATE)
// ? TRACKS HOW MANY TIMES EACH EVENT OCCURS
// ? LOGS A SUMMARY OF THE EVENTS OCCURRENCES WHEN A SPECIAL SUMMARY EVENT IS TRIGGERED


// ! REQUIREMENTS

// ? create at least four custom events (e.g., 'login', 'logout', 'purchase', 'profileUpdate')
// ? emit these events multiple times with different arguments (e.g., user information, purchase details)
// ? tracks and store the count of each event type
// ? define a summary events tha logs a details report of how many times each was triggered

const EventEmitter = require('events');

const userEmitter = new EventEmitter();
const fs = require('fs');


// event count tracking
const eventCounts = {
    login: 0,   
    logout: 0,
    purchase: 0,
    profileUpdate: 0
};  


const logFile = 'event_log.txt';

if (fs.existsSync(logFile)) {
    const data = fs.readFileSync(logFile, 'utf8');
    Object.assign(eventCounts, JSON.parse(data));
}       

function savecounts(){
    fs.writeFileSync(logFile, JSON.stringify(eventCounts));
}

userEmitter.on('login', (user) => {
    console.log(`${user} has logged in.`);  
    eventCounts.login++;
    savecounts();   
} );

userEmitter.on('logout', (user) => {
    console.log(`${user} has logged out.`);
    eventCounts.logout++;
    savecounts();
} );

userEmitter.on('purchase', (details) => {
    console.log(`Purchase made: ${details.item} for $${details.amount}.`);
    eventCounts.purchase++;
    savecounts();   
});

userEmitter.on('profileUpdate', (user) => {
    console.log(`${user} has updated their profile.`);
    eventCounts.profileUpdate++;
    savecounts();
}); 


// emit events
userEmitter.emit('login', 'Alice');
userEmitter.emit('purchase', { item: 'Laptop', amount: 1200 });
userEmitter.emit('profileUpdate', 'Alice');                         
userEmitter.emit('logout', 'Alice');


userEmitter.emit('login', 'Bob');
userEmitter.emit('purchase', { item: 'Phone', amount: 800 });
userEmitter.emit('profileUpdate', 'Bob');
userEmitter.emit('logout', 'Bob');  


// summary event
userEmitter.on('summary', () => {
    console.log('Event Summary:');  
    console.log(`Login: ${eventCounts.login}`);
    console.log(`Logout: ${eventCounts.logout}`);
    console.log(`Purchase: ${eventCounts.purchase}`);
    console.log(`Profile Update: ${eventCounts.profileUpdate}`);
});

// trigger summary event
userEmitter.emit('summary');    
