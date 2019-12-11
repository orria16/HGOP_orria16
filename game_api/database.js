module.exports = function (context) {
	const Client = context('pgClient');
	const configConstructor = context('config');
	const config = configConstructor(context);

	function getClient() {
		return new Client({
			host: config.pgHost,
			user: config.pgUser,
			password: config.pgPassword,
			database: config.pgDatabase,
		});
	}

	let client = getClient();
	setTimeout(() =>
		client.connect((err) => {
			if (err) {
				console.log('failed to connect to postgres!');
			} else {
				console.log('successfully connected to postgres!');
			}
		}), 5000);
	// Function returns total count and takes in queries as parameters
	const sendQuery = (onSuccess, onError, query) => {
		let client = getClient();
		client.connect((err) => {
			if (err) {
				onError(err);
				client.end();
			} else {
				client.query(query, (err, res) => {
					if (err) {
						onError();
					} else {
						res.rows[0] ? onSuccess(res.rows[0].count) : onSuccess();
					}
					client.end();
				});
			}
		});
		return;
	};

	return {

		insertResult: (won, score, total, onSuccess, onError) => {
			const query = {
				text: 'INSERT INTO "GameResult" ("Won", "Score", "Total", "InsertDate") VALUES($1, $2, $3, CURRENT_TIMESTAMP);',
				values: [won, score, total],
			};
			return sendQuery(onSuccess, onError, query);
		},

		// Should call onSuccess with integer.
		getTotalNumberOfGames: (onSuccess, onError) => {
			const query = {
				text: 'SELECT COUNT(*) FROM "GameResult";'
			};
			return sendQuery(onSuccess, onError, query);
		},
		// Should call onSuccess with integer.
		getTotalNumberOfWins: (onSuccess, onError) => {
			const query = {
				text: 'SELECT COUNT(*) FROM "GameResult" WHERE "Won" = TRUE;'
			};
			return sendQuery(onSuccess, onError, query);
		},
		// Should call onSuccess with integer.
		getTotalNumberOf21: (onSuccess, onError) => {
			const query = {
				text: 'SELECT COUNT(*) FROM "GameResult" WHERE "Total" = 21;'
			};
			return sendQuery(onSuccess, onError, query);
		},
	};
};