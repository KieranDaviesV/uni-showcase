module.exports = {

	JSONOutput: (res, err, results) => {
		if (err) {
			return (
				res.status(500).json({
					confirmation: 'fail',
					message: err
				})
			);
		}
		return (
			res.status(201).json({
				confirmation: 'success',
				message: results
			})
		);
	}
};
