const fs = require('fs')
const path = require('path')

function walk (dir, record) {
    fs.readdirSync(dir).forEach(fileOrDir => {
        if (fileOrDir === 'node_modules') return;
        if (fs.statSync(path.join(dir, fileOrDir)).isDirectory()) walk(path.join(dir, fileOrDir), record)

        if (fileOrDir.endsWith(".json")) {
            if (['database.json', 'database.schema.json', 'graph.schema.json', '.eslintrc.json', 'package-lock.json', 'package.json'].includes(path.join(dir, fileOrDir))) {
                return
            }
            record.push(path.join(dir, fileOrDir))
        }
    });
    return record
}

let result = []
walk('./', result).forEach(item => console.log(item))

const dst = JSON.stringify(result, null, 2)
fs.writeFileSync('database.json', dst)
