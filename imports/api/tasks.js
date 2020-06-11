import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Mongo } from 'meteor/mongo'

export const Tasks =  new Mongo.Collection('tasks')

if(Meteor.isServer) {

	Meteor.publish('publishedTasks', function() {
		if(Meteor.userId) {
			return Tasks.find({ owner: this.userId })
		}
	})
}

Meteor.methods({

	'tasks.insert'(task) {
		check(task, String)

		if(!this.userId) {
			throw new Meteor.Error('not-authorized')
		}

		Tasks.insert({
			name: task,
      createdAt: new Date(),
      owner: this.userId,
      checked: false
		})

	},

	'tasks.setChecked'(taskId, setChecked) {
		check(taskId, String)
		check(setChecked, Boolean)

		const task =Tasks.findOne(taskId)
		if(task.owner !== this.userId) {
			throw new Meteor.Error('not-authorized')
		}

		Tasks.update(taskId, {
  		$set: { checked: setChecked }
  	})
	},

	'tasks.delete'(taskId) {
		check(taskId, String)

		const task =Tasks.findOne(taskId)
		if(task.owner !== this.userId) {
			throw new Meteor.Error('not-authorized')
		}

		Tasks.remove(taskId)
	},

	'tasks.update'(taskId, taskName) {
		check(taskId, String)

		const task =Tasks.findOne(taskId)
		if(task.owner !== this.userId) {
			throw new Meteor.Error('not-authorized')
		}

		Tasks.update(taskId, {
			$set: { name: taskName }
		})

	}
})