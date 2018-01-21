const node = require('./node').node

module.exports = {
	initFriend: (opts) => {
		let _node = new node.Node(opts)

		const terminate = () => _node.end().then( (n) =>{
			n.log('terminate the node'.dim)
			process.exit(0)
		})
		
        
		process.on('SIGTERM', terminate)
		process.on('SIGINT', terminate)

		_node.start().then( n => {
			n.log('Node has been initilised')
		})
	}
}