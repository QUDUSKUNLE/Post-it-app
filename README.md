# Post-it-app
Post-It is a simple application that allows friends and colleagues create groups for notifications.

It is a simple RESTful api, which creates users, create group and add memebrs to a group users.

use x-www-formurlencoded parameters.

Methods

	'/':

		.POST: Welcome to PostIt Homepage
    
    
'/user/signup'

	.POST: Create a user

		parameters:

			email: string

			username: string

			password: string

'/users/signin'

	.POST: Sign in user

		parameters:

			email: string

			password: string

'/group'

	.POST: Create a group

		parameters:

			email: string

			password: string
        
        		groupName: string
        
'/group/groupId/user'
      
 	.POST:Add a user a group

		parameters:

			email: string

			password: string
        
        		groupName: string
        
        		groupMember: string
        
        		groupId: string
      
      


