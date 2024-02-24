// Assuming the file path remains the same and the necessary modules are already imported.
const fs = require('fs');
const path = require('path');
const teamInfo = require('../teamData'); // Correctly importing teamInfo

describe('teamInfo', () => {
    // Test to check if teamInfo is not empty
    test('teamInfo is not empty', () => {
        expect(teamInfo.length).not.toBe(0);
    });

    // tests eahc team member has required properties
    test('each team member has required properties', () => {
        teamInfo.forEach(member => {
            expect(member).toHaveProperty('id');
            expect(member).toHaveProperty('name');
            expect(member).toHaveProperty('role');
            expect(member).toHaveProperty('bio');
            expect(member).toHaveProperty('type'); 
        });
    });

    // Test to ensure each team member has a unique id
    test('each team member has unique id', () => {
        const ids = teamInfo.map(member => member.id);
        const uniqueIds = [...new Set(ids)];
        expect(ids.length).toBe(uniqueIds.length);
    });

    //make sure id, name, and role of each team member are not empty
    test('id, name, and role of each team member are not empty', () => {
        teamInfo.forEach(member => {
            expect(member.id).not.toBe('');
            expect(member.name).not.toBe('');
            expect(member.role).not.toBe('');
        });
    });

    // bio of each team member is not empty
    test('bio of each team member is not empty', () => {
        teamInfo.forEach(member => {
            expect(member.bio).not.toBe('');
        });
    });

    //correct image file exists for each team member
    describe('teamInfo images', () => {
        it('should have a corresponding image for each member', () => {
            teamInfo.forEach(member => {
                // Construct the image file name based on the member's id and the type property.
                // Adjust the path construction as necessary to fit your project's directory structure.
                const imageName = `${member.id}${member.type}`;
                const imagePath = path.join(__dirname, '../../img', imageName); // Adjust the relative path as necessary
                // console.log(imagePath);
                // Check if the image file exists in the expected location (public/images/) for our team project
                const imageExists = fs.existsSync(imagePath);
                expect(imageExists).toBe(true);
            });
        });
    });
});
