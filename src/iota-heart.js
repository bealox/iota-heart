const program = require('commander')
const version = require('../package.json').version
const { initFriend } = require('./index')

const parseInt = (v) => { parseInt(v) }

process.on('unhandledRejection', function (reason, p) {
	console.log('Unhandled Rejection at: Promise', p , 'reason:', reason)
})


program.version(version)
	.option('-p --port [integer]', 'IRI port', parseInt, 14265)
	.parse(process.argv)

initFriend(program)

