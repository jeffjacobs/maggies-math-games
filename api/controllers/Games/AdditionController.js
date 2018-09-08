module.exports = {
	index: function (req, res) {
		return res.view('games/addition', {title: 'Maggie\'s Math Games | Addition' });
	},
	redirect: function (req, res) {
		return res.redirect(301, '/games/addition');
	}
};