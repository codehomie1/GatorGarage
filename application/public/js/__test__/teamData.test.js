// FILEPATH: /Users/akramalraeeini/Desktop/csc-648/csc648-sp24-03-Team06/application/public/js/teamData.test.js
const teamInfo = require('../teamData');


test('teamInfo is not empty', () => {
    expect(teamInfo.length).not.toBe(0);
});

test('each team member has required properties', () => {
    teamInfo.forEach(member => {
        expect(member).toHaveProperty('id');
        expect(member).toHaveProperty('name');
        expect(member).toHaveProperty('role');
        expect(member).toHaveProperty('bio');
        expect(member).toHaveProperty('image');
    });
});

test('each team member has unique id', () => {
    const ids = teamInfo.map(member => member.id);
    const uniqueIds = [...new Set(ids)];
    expect(ids.length).toBe(uniqueIds.length);
});

test('id, name, and role of each team member are not empty', () => {
    teamInfo.forEach(member => {
        expect(member.id).not.toBe('');
        expect(member.name).not.toBe('');
        expect(member.role).not.toBe('');
    });
});
    test('each team member has an image in the images folder', () => {
        teamInfo.forEach(member => {
            const imagePath = path.join(__dirname, '../../Images', member.image);
            expect(fs.existsSync(imagePath)).toBe(true);
        });
    });
