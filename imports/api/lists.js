import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Mongo } from 'meteor/mongo'

export const Lists =  new Mongo.Collection('lists')

if(Meteor.isServer) {

	Meteor.publish('publishedLists', function() {
		if(Meteor.userId) {
			return Lists.find({ owner: this.userId })
		}
	})

}

Meteor.methods({

	'lists.insert'(list) {
		check(list, String)

		if(!this.userId) {
			throw new Meteor.Error('not-authorized')
		}

		Lists.insert({
			name: list,
      createdAt: new Date(),
      owner: this.userId,
      checked: false
		})

	},

// 	'lists.setChecked'(listId, setChecked) {
// 		check(listId, String)
// 		check(setChecked, Boolean)

// 		const list =Lists.findOne(listId)
// 		if(list.owner !== this.userId) {
// 			throw new Meteor.Error('not-authorized')
// 		}

// 		Lists.update(listId, {
//   		$set: { checked: setChecked }
//   	})
// 	},

// 	'lists.delete'(listId) {
// 		check(listId, String)

// 		const list =Lists.findOne(listId)
// 		if(list.owner !== this.userId) {
// 			throw new Meteor.Error('not-authorized')
// 		}

// 		Lists.remove(listId)
// 	},

// 	'lists.update'(listId, listName) {
// 		check(listId, String)

// 		const list =Lists.findOne(listId)
// 		if(list.owner !== this.userId) {
// 			throw new Meteor.Error('not-authorized')
// 		}

// 		Lists.update(listId, {
// 			$set: { name: listName }
// 		})

// 	}

})