# Post-it-app
Post-It is a simple application that allows friends and colleagues create groups for notifications.

It is a simple RESTful api, which creates users, create group and add memebrs to a group users.

use x-www-formurlencoded parameters.

Methods

<b>'/'</b>:<br/>

	.GET: http://localhost:8080/
    
    
<b>'/signup'</b>:

      .POST: Create a user
      
           parameters:
	   	
		email: string
		
		username: string
		
		password: string

<b>'/signin'</b>:

      .POST: Sign in user
      
           parameters:
	   
	   	email: string
	   
	   	password: string

<b>'/group'</b>:

      .POST: Create a group
      
           parameters:
		
		email: string

		password: string
        
        	groupName: string
        
<b>'/group/groupId/user'</b>:

      .POST: Add a user a group
      
           parameters:
	    
		email: string

		password: string
        
        	groupName: string
        
        	groupMember: string
