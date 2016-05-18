"use strict";

var mongoose = require('mongoose'),
	Contact = require('../models/contacts.models');

module.exports = {
	getAllContacts : getAllContacts,
	getContact: getContact,
	createContact: createContact,
	updateContact: updateContact
};

function getAllContacts(req, res){
	Contact.find({}, function(error, contacts){
		if(error){
			console.log("Error in fetching the contacts" + err);
		}
		else {
			console.log("Success");
			res.json(contacts);
		}


	});
}

function getContact(req, res){

	var id = req.swagger.params.id.value;
	console.log(id);
	Contact.findById(id, function(error, contact){
		if(error){
			console.log("No Such Contact found:" + error);
		}
		else {
			console.log("We  found one contact");
			res.json([contact]);
			console.log(contact);
		}

	});
}

function createContact(req, res){
	console.log("Firstname :" + req.swagger.params.firstname.value + "Lastname :" + req.swagger.params.lastname.value + "Phone :" + req.swagger.params.phonenumber.value);
	//res.json("Firstname :" + req.swagger.params.firstname.value + "Lastname :" + req.swagger.params.lastname.value + "Phone :" + req.swagger.params.phonenumber.value);
	var contact = new Contact({
		firstname: req.swagger.params.firstname.value,
		lastname: req.swagger.params.lastname.value,
		phone: req.swagger.params.phonenumber.value
	});
	console.log(contact);
	//res.json(contact);
	
	contact.save(function(error){
		if(error){
			console.log("Unable to save the contact" + error);
		}
		res.json("Contact Created Successfully");
	});
}

function updateContact(req, res){
	var id = req.swagger.params.id.value;
	console.log(id);
	console.log("Firstname :" + req.swagger.params.firstname.value + "Lastname :" + req.swagger.params.lastname.value + "Phone :" + req.swagger.params.phonenumber.value);
	Contact.findById(id, function(error, contact){
		if(error){
			console.log("ID not found:" + error);
		}
		else {
			contact.firstname = req.swagger.params.firstname.value;
			contact.lastname = req.swagger.params.lastname.value;
			contact.phonenumber = req.swagger.params.phonenumber.value;
			contact.save(function(error){
				if(error){
					console.log("Unable to update" + error);
				}
				else {
					res.json("Contact Updated Successfully");
				}
			});
		}
	});
}