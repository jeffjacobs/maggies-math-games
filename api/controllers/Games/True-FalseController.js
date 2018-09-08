module.exports = {
	index: function (req, res) {
		return res.view('games/true-false', {title: 'Maggie\'s Math Games | True or False' });
	},
	redirect: function (req, res) {
		return res.redirect(301, '/games/true-false');
	}
};