const express = require('express');
const bodyParser = require('body-parser');

const Comment = require('./models/comment');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
});

app.get('/comments', (req, res, next) => {
	let conditions = {
		articleUrl: req.query.article_url || ""
	};
	Comment.find(conditions, {}, {
		sort: {createdDate: -1}
	}, function(err, comments) {
		if (err) {
			res.send({succ: false});
			return res.end();
		} else {
			res.send({
				succ: true,
				comments: comments
			});
			return res.end();
		}
	})
})

app.post('/comments', (req, res, next) => {
	Comment.save(req.body, function(err, comment) {
		if (err) {
			res.send({succ: false});
			return res.end();
		} else {
			res.send({
				succ: true,
				comment: comment
			});
			return res.end();
		}
	})
});

app.listen(port, () => {console.log(`listening at ${port}`);});
