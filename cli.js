import odoo from 'odoo-api'
import options from './init'

var program = require('commander')
var fs = require('fs')

function readJSON(file) {
    var json = JSON.parse(fs.readFileSync(file, 'utf8'));
    return json
}

function base64encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

function readJSON(file) {
    var json = JSON.parse(fs.readFileSync(file, 'utf8'));
    return json
}

function base64encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

odoo.settings(options)

function desc(name) {
    odoo.desc(name, [], {}, function (err, resp) {
        console.log(resp)
    })
}

program
  .version('1.0.0')
  .command('info <name>')
  .action(function (name) {
      odoo.login(function(err, resp) {
        desc(name)
      })
  })

function read(name, id) {
    odoo.one(name, id, function(err, resp) {
        console.log(resp)
    })
}

program
  .command('read <name>')
  .option("-i, --id <id>", "ID of the record to read", parseInt)
  .action(function(name, options) {
      odoo.login(function (err, resp) {
          read(name, options.id)
      })
  })


program
  .command('list <name>')
  .option("-l, --limit [limit]", "Limit number of records", parseInt)
  .action(function (name, options) {
       odoo.login(function(err, resp) {
          list(name, options.domain, options.limit)
       })
  })

function create(name, file) {
    let json = readJSON(options.file)
    if (Array.isArray(json)) {
        for (let idx in json) {
            let item = json[idx]
            odoo.create(name, item, function(err, resp) {
                console.log(resp)
            })
        }
    } else {
        model.create(name, json, function(err, resp) {
            console.log(resp)
        })
    }
}

program
  .command('create <name>')
  .option("-f, --file <file>", "JSON file")
  .action(function (name, options) {
      odoo.login(function (err, resp) {
          create(name, options.file)
      })
  })

program.parse(process.argv);
