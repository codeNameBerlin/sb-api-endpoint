const Clarifai = require('clarifai');

// initialize clarifai with your api key
const app = new Clarifai.App({
 apiKey: 'e7f8fcd8b4ac440db94eaf6fd29ce102'
});

const handleApiCall = (req, res) => {
	app.models.predict(
    Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
    	res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with API'))
} 

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where("id", "=", id)
	.increment("entries", 1)
	.returning("entries")
	.then(entry => {
		res.json(entry)
	})
	.catch(err => 
		res.status(400).json("unable to update entries"))
};

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
};