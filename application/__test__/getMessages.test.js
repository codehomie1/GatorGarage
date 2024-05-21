// test if messages.js middleware functions exists
const messages = require('../middleware/messages');
test('getUserMessages function exists', () => {
    expect(messages.getUserMessages).toBeDefined();
});
test('getMessageDetails function exists', () => {
    expect(messages.getMessageDetails).toBeDefined();
});

// will add tests later on when we connect the messages middleware to the server.js