const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', '..', 'database', 'data', 'verify.json');

let data = {};

try {
    data = require(filePath);
} catch (error) {
    console.error('Error loading verification data:', error);
}

module.exports = {
    async findOne(filter) {
        const guildId = filter.Guild;
        return data[guildId] || null;
    },
    async save() {
        try {
            await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2));
            console.log('Verification data saved successfully.');
        } catch (error) {
            console.error('Error saving verification data:', error);
        }
    },
    async update(guildId, newData) {
        data[guildId] = newData;
        await this.save();
    }
};
