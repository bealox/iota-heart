const {Base} = require('./base')
const IOTA = require('iota.lib.js')

const DEFAULTS = {
	beatInterval: 10000,
	hostname: 'localhost',
	port: 14265,
}

class Heart extends Base{
	constructor(options){
		super({...DEFAULTS, ...options})
		this.api = (new IOTA({host: `http://${this.opts.hostname}`, port: this.opts.port })).api
		this._heartBeat = this._heartBeat.bind(this)
		this.end = this.end.bind(this)
		this.isHealthy = false
	}
    
	start(){
		return new Promise((resolve)=> {

			const getNodeInfo = () =>  this.api.getNodeInfo((err, info)=>{
				if(!err){
					this.heartBeat = setInterval(this._heartBeat, 30000)
					resolve(this)
				}else{
					console.log('looking for a node')
					setTimeout(getNodeInfo, 5000)
				}
			})
            
			getNodeInfo()

		})
	}
    
	end(){
		this.isHealthy = false
		this.heartBeat && clearTimeout(this.heartBeat)
		this.heartBeat = null
	}
    
	_getStats(){
		return new Promise( (resolve, reject ) => {
			this.api.getNodeInfo((err, info) => {
				if(err){
					return reject()
				}
				resolve(info)
			})
		})
	}
    
	_heartBeat(){
		const onError = () => {
			this.log('heart stops...'.red)
			this.isHealthy = false
		}
		return this._getStats().then(() => {
			this.log('heart is beating...'.green)
			this.isHealthy = true
		}).catch(onError)
	}
    
	// heartBeatTracker(){
	// 	setInterval(this._heartBeat, 30000)
	// }
}

module.exports = {
	Heart
}