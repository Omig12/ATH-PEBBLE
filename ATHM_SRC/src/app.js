  /**
  * Welcome to Pebble.js!
  *
  * This is where you write your app.
  */
  
// Neccesary Dependency for pebble UI implementation.
  var UI = require('ui');

// Neccesary Dependency for Haptic feedback
  var Vibe = require('ui/vibe');

// Necessary Dependency for Accelerometer feedback
//  var Accel = require('ui/accel');

// Neccesary Dependency for AJAX
// var ajax = require('ajax');

// Pebble.showSimpleNotificationOnPebble();

/* Storage for some JSON responses */

  var globalJSON = {
    'authToken': 'evereverevereverevereverever',
    'senderPhoneNum': '',
    'recipientPhoneNum': '',
    'amount': 0
  }; // global JSON that will be updated with credentials to make the transfer  
  var loginResponse; //catches login JSON response from ATH movil server
  var transferResponse; //catches transfer JSON response from ATH movil server



/* JSON - Login ATH_M API */

  var login = function(usr, psswd){
      var request = new XMLHttpRequest();
	// request.open('POST', 'http://54.175.166.76:8080/api/login');
	request.open('POST', 'http://54.209.246.213:8080/api/login');
	request.setRequestHeader('Content-Type', 'application/json');
  
      request.onreadystatechange = function () {
        if (this.readyState === 4) {
          console.log('Status:', this.status);
          console.log('Headers:', this.getAllResponseHeaders());
          console.log('Body:', this.responseText);
        }
      };
  
      var body = {
        'username': usr,
        'password': psswd
      };
  
      request.send(JSON.stringify(body));
      
      var serverResponse = request.responseText;
      
      return serverResponse;
  }; //function to login to ATH movil database. two arguments: username and password. returns JSON response from server  



/* JSON - Make Transfer ATH_M API */

  var transfer = function(transferJSON) { 
    var request = new XMLHttpRequest();
  
    request.open('POST', 'http://54.175.166.76:8080/api/makeTransfer');
  
    request.setRequestHeader('Content-Type', 'application/json');
  
    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        console.log('Status:', this.status);
        console.log('Headers:', this.getAllResponseHeaders());
        console.log('Body:', this.responseText);
      }
    };
  
    request.send(JSON.stringify(globalJSON));
    var transferResponse = request.responseText;
    return transferResponse; 
  
  }; //function to send transfer info to ATH movil server. returns JSON response from server

/* Transfer history incomming ATH_M API */

/* Draft! Still on the works!
var history = new XMLHttpRequest();

	history.open('POST', 'http://54.209.246.213:8080/api/transferHistory/inbound');
	// request.open('POST', 'http://54.175.166.76:8080/api/transferHistory/inbound');
	history.sentRequestHeader('Content-Type', 'application/json');
	history.onreadystatechange = funtion () {
		if (this.readyState === 4 ) {
			console.log('Status:', this.status);
			console.log('Headers:', this.getAllResponseHeaders());
			console.log('Body:', this.responseText);
		}
	};
	history.send(JSON.stringify(body));
 };
*/

/* Main UI CARD */

  var main = new UI.Card({
   title: 'ATHMovil ',
   subtitle: 'By: Los ñames',
    body: 'Up.: Register User\n' +
          'Sel: Log in\n' +
          'Dwn: About\n',
  }); // Main menu: three options.
  


/* User Card UI */
  
  var userCard = new UI.Card({
    title: 'Choose User: ',
    body: 'Up: PebbleUser1\n\n\n' +
    'Dwn: PebbleUser2' ,
  }); //user selection card



/* Register for ATH_M UI Card */
  var Register = new UI.Card({
   title: 'Register: ',
    body: 'Please use companion app to register your account. ',
  }); //user selection card

/* Transaccion Selection UI Card */

  var moneyCard = new UI.Card({
       title: 'Choose action: ',
       body: 'Up: Transfer Money\n\n' + 
             'View Transactions\n\n' + 
             'View Balance',
});



/* Money selection UI Menu */

  var money = [
    {
		title: '$100.00',
		subtitle: 100
    },
    {
      title: '$50.00',
      subtitle: 50
    }, 
    {
      title: '$20.00',
      subtitle: 20
    },
    {
      title: '$10.00',
      subtitle: 10
    },
    {
      title: '$5.00',
      subtitle: 5
    },
    {
      title: '$1.00',
      subtitle: 1
    }
  ];
  var TransferList = new UI.Menu({
          sections: [{
            title: 'Transfer Amount: ',
            items: money
      }]
  });



/* List of contacts to transfer money to*/
/* Contact list UI Menu */

  var contacts = [
  {
    title: "pebbleUser",
    subtitle: "7875559090"
  },
  {
    title: "Fulano Smith",
    subtitle: "7875550909"
  },
  {
    title: "PhonyUser1",
    subtitle: "4204200420"
  }
];
  var ContactList = new UI.Menu({
        sections: [{
        title: 'Contact List',
        items: contacts
    }]
});

/* Still under works! 

// Ajax "use"
var web = new UI.Card({
	title:'Web: ',
  subtitle:e.item.subtitle,
  body: content
});

// when called detailCard.show();

ajax({ url: 'http://api.theysaidso.com/qod.json', type: 'json' },
  function(data) {
    web.body(data.contents.quote);
    web.title(data.contents.author);
  }
);
*/




// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! \\
//          Half time show             \\    
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! \\

/* Here we start calling Functions */

// Start Main

main.show(); //display main menu


//Accel.init(); // Initiate accel listening



// Testing grounds

// Temporarely displaying Trnafer List
main.on('click', 'up', function(e) {
	Register.show();
 }); //if up is pressed on main message is shown.



// End Testing grounds


// !!!!!!!!!!!!!!!!!!!!! \\


main.on('click', 'select', function(e) {
    userCard.show();
  }); //if select is pressed on main menu the user selection card is shown
  
main.on('click', 'down', function(e) {
   var about = new UI.Card({scrollable: true,});
    about.title('About us:');
    about.subtitle('Los Ñames:');
    about.body('Omar \nAlejandro \nIsrael \nJose');
    about.show();
  }); //waits for down button press to display the 'about us' card 

// Three call to main end!

// If Login then

userCard.on('click', 'up', function(e) { 
    loginResponse = login ('pebbleUser1', 'ath.rocks');
	// globalJSON.senderPhoneNum = loginResponse.phoneNumber;
    console.log(globalJSON.senderPhoneNum);
	moneyCard.show();
  });
      
userCard.on('click', 'down', function(e) { 
    loginResponse = login ('PebbleUser2', 'password!');
	// globalJSON.senderPhoneNum = loginResponse.phoneNumber;
	console.log(globalJSON.senderPhoneNum);
    moneyCard.show();
  }); //logins into ATH movil with user 2 and shows transaction card options

// After User Selection

moneyCard.on('click', 'up', function(e) {
      //console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
      //console.log('The item is titled "' + e.item.title + '"');
    ContactList.show();
}); //logins into ATH movil with user 1 and shows transaction card options


moneyCard.on('click', 'select', function(e) {
       //console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
       //console.log('The item is titled "' + e.item.title + '"');
       //ContactList.show();
  var testShit = new UI.Menu({title: 'money'});
  testShit.show();
     });  // calls view transactions card. not implemented yet!

ContactList.on('select', function(e) {
//  globalJSON.recipientPhoneNum = ContactList[e.itemIndex].subtitle;
  TransferList.show();	
});
               

 //  Listener for amount selected
	// Add a click listener for select button click
	TransferList.on('select', function(event) {

		// Show a card with clicked item details
		var detailCard = new UI.Card({
			title: "Enviar: " + money[event.itemIndex].title,
			body: money[event.itemIndex].subtitle
		});
	
	globalJSON.amount = detailCard.body ;	
		console.log(globalJSON.amout);
		// Trigger a vibration
		Vibe.vibrate('short');

		// Show the new Card
		detailCard.show();
		
		detailCard.on('select', function(event) {
			transferResponse = transfer(globalJSON);
			var testMsg = new UI.Card ({title: transferResponse.status});
			Pebble.showSimpleNotificationOnPebble('Amount', {gobalJSON: 'amount'});
			testMsg.show();
		});
	});
