module.exports = {
	index: function (req, res) {
		return res.view('games/timed-test', {title: 'Maggie\'s Math Games | Timed Test' });
	},
	redirect: function (req, res) {
		return res.redirect(301, '/games/timed-test');
	}
};