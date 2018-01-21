const {Base} = require('./base')
const {Heart} = require('./heart')

const DEFAULTS = {
}

class Node extends Base{
	constructor(options) {
		super({ ...DEFAULTS, ...options })
        
		this.end = this.end.bind(this)
		this._startNode = this._startNode.bind(this)
	}
    
    
	//start 
	start() {
		return this._startNode().then( n =>{
			return this
		})
	}
    
	_startNode(){
		return new Heart(
			{'logId': 'HEART'}
		).start().then( (heart) => {
			this.nodeHeart = heart
			return heart
		})
	}

	end(){
		return new Promise(( resolve) => {
			if(this.nodeHeart){
				this.nodeHeart.end()
			}
			resolve(this)
		})
	}


}

module.exports = {
	Node
}