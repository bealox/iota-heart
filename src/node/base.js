require('colors')

const DEFALUTS = {
	'logId': 'Base',
	logIdentWidth: 12
}

class Base {
	constructor(options){
		this.opts = {...DEFALUTS, ...options}
	}
    
	log(){
		const date = new Date()
		const timeString = `${date.toLocaleDateString()}.${this.formatMilliseconds(date.getMilliseconds())}`
		const space = this.opts.logId.length > this.opts.logIdentWidth
			? `\n${' '.repeat(this.opts.logIdentWidth)}`
			: ' '.repeat(this.opts.logIdentWidth - this.opts.logId.length)
		const logIdent = `${this.opts.logId}${space}`.dim.bold
		console.log(`${timeString}\t${logIdent}`, ...arguments)
	}
    
	formatMilliseconds(milliseconds) {
		var formatted = milliseconds / 1000
		formatted = formatted.toFixed(3)
		formatted = formatted.toString()
		return formatted.slice(2)
	}
    
	// end() {}

	// start(){}
}


module.exports = {
	Base
}