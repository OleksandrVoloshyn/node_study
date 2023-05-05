const fs = require('node:fs/promises')
const path = require('node:path')

const dbPath = path.join(process.cwd(), 'db', 'users.json');

const reader = async () => {
    const data = await fs.readFile(dbPath);
    return data ? JSON.parse(data.toString()) : [];
}

const writer = async users => await fs.writeFile(dbPath, JSON.stringify(users));


module.exports = {
    reader,
    writer,
}
