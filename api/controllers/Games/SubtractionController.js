module.exports = {
	index: function (req, res) {
		return res.view('games/subtraction', {title: 'Maggie\'s Math Games | Subtraction' });
	},
	redirect: function (req, res) {
		return res.redirect(301, '/games/subtraction');
	}
};