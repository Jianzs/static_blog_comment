const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Comment = require('./models/comment');

const app = express();
const port = process.env.PORT || 4000;

/**
 * connect mongodb
 */
mongoose.connect('mongodb://localhost/comment', {useMongoClient: true});
const db = mongoose.connection;
db.on('error', (err) => {console.log(err);});
db.once('open', () => {console.log('open mongodb successfully!\n');});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://www.zhengsj.top');
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
	req.body.content.replace(/</g, "&lt;");
	req.body.content.replace(/>/g, "&gt;");
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
