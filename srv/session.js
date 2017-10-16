const session = {};

let TTL = 5 * 60 * 60 * 1000; // 5 mins by default

const _o = {
	config : (cfg) => {
		if (cfg.ttl) TTL = cfg.ttl;
	},

	new : (data) => {
		const id  = Math.floor(Math.random()*9000000) + 1000000;
		session[id] = data;
		session[id].timestamp = Date.now();
let c=0; for (var i in session) c++;
console.log("CREATED ", id, "[total "+c+"]");
		return id;
	},

	remove : (id) => {
let c=0; for (var i in session) c++;
console.log("DELETED ", id, "[total "+c+"]");
		delete session[id];
	},

	removeOldSessions : () => {
		for (var id in session) {
			sess = session[id];
			if (!sess.timestamp || Date.now() - sess.timestamp > TTL) {
console.log("DELETED old", id);
				_o.remove(id);
			}
		}
	}, 

	get : (id) => {
console.log(this);
		_o.removeOldSessions();
		const sess = session[id];
		if (sess) {
			sess.timestamp = Date.now();
			return sess;
		}
	}
}

module.exports = _o;