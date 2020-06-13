import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Mongo } from 'meteor/mongo'

export const Tags =  new Mongo.Collection('tags')

if(Meteor.isServer) {

	Meteor.publish('publishedTags', function() {
		if(Meteor.userId) {
			return Tags.find({ owner: this.userId })
		}
	})

}

Meteor.methods({

	'tags.insert'(tag) {
		check(tag, String)

		if(!this.userId) {
			throw new Meteor.Error('not-authorized')
		}

		Tags.insert({
			name: tag,
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