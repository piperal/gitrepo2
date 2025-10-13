const express = require("express");
const router = express.Router();

//controllers

const{
	movie,
	people,
	add,
	addpost,
	job,
	jobpost,
	viewjob} = require("../controlers/moviesController.js")

router.route("/").get(movie)
router.route("/people").get(people)
router.route("/people/add").get(add)
router.route("/people/add").post(addpost)
router.route("/pos").get(viewjob)
router.route("/new").get(job)
router.route("/new").post(jobpost)

module.exports = router;