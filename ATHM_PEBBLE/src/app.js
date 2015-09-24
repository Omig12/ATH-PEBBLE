  /**
  * Welcome to Pebble.js!
  *
  * This is where you write your app.
  */
  
  var UI = require('ui'); //user interface class(??)
  //var Vector2 = require('vector2');
  
  var globalJSON = {
    'authToken': 'everevereverever',
    'senderPhone': '',
    'recipientPhoneNum': '',
    'amount': 0
  }; //global JSON that will be updated with credentials to make the transfer
  
  var loginResponse; //catches login JSON response from ATH movil server
  var transferResponse; //catches transfer JSON response from ATH movil server

var transfer = function(transferJSON)

{
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

  request.send(JSON.stringify(transferJSON));
  
  var transferResponse = request.responseText;
  return transferResponse;
}; //function to send transfer info to ATH movil server. returns JSON response from server
  
  var login = function(usr, psswd)
  
  {
      var request = new XMLHttpRequest();
  
      request.open('POST', 'http://54.175.166.76:8080/api/login');
  
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
  
  var main = new UI.Card({
   title: 'ATHMovil ',
   subtitle: 'By: Los ñames',
    body: 'Up.: Register User\n' +
          'Sel: Log in\n' +
          'Dwn: About\n' ,
  }); //main menu. three options. Foto is not working as of 5:54AM
  
  main.show(); //display main menu
  
  var userCard = new UI.Card({
    title: 'Choose User: ',
    body: 'Up: PebbleUser1\n\n\n' +
          'Dwn: PebbleUser2' ,
  }); //user selection card
  
  main.on('click', 'select', function(e) {
    
    userCard.show();
  }); //if select is pressed on main menu the user selection card is shown

var moneyCard = new UI.Card({
       title: 'Choose action: ',
       body: 'Up: Transfer Money\n\n' + 
             'View Transactions\n\n' + 
             'View Balance',
});

userCard.on('click', 'up', function(e) { 
    Pebble.sendAppMessage('DWN');
    moneyCard.show();
    loginResponse = login ('pebbleUser1', 'ath.rocks');
    globalJSON.senderPhoneNum = loginResponse.phoneNum;
    Pebble.sendAppMessage(loginResponse.phoneNum, 'Aqui hiria el response del Jason');  
  });
    
  
  userCard.on('click', 'down', function(e) { 
     Pebble.sendAppMessage('DWN');
     moneyCard.show();
     loginResponse = login ('PebbleUser2', 'password!');
     globalJSON.senderPhoneNum = loginResponse.phoneNumber;
     Pebble.sendAppMessage(loginResponse.phoneNum, 'Aqui hiria el response del Jason'); 
}); //logins into ATH movil with user 2 and shows transaction card options
   

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
moneyCard.on('click', 'up', function(e) {
      //console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
      //console.log('The item is titled "' + e.item.title + '"');
    ContactList.show();
}); //logins into ATH movil with user 1 and shows transaction card options

var money = [
  {
	title: '$100.00',
  },
  {
    title: '$50.00',
  }, 
  {
    title: '$20.00',
  },
  {
    title: '$10.00',
  },
  {
	title: '$5.00'
  },
  {
    title: '$1.00',
  }
];
var TransferList = new UI.Menu({
        sections: [{
          title: 'Transfer Amount: ',
        items: money
    }]
});

moneyCard.on('click', 'select', function(e) {
       //console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
       //console.log('The item is titled "' + e.item.title + '"');
       //ContactList.show();
  var testShit = new UI.Menu({title: 'money'});
  testShit.show(money);
     });  // calls view transactions card. not implemented yet!

ContactList.on('select', function(e) {
  globalJSON.recipientPhoneNum = ContactList[e.itemIndex].subtitle;
  TransferList.show();
});
               
TransferList.on('select', function(e) {
  globalJSON.amount = TransferList[e.itemIndex].title;
  transferResponse = transfer(globalJSON);
  var testMsg = new UI.Card ({title: transferResponse.status});
  Pebble.sendAppMessage(testMsg);
  testMsg.show(); //success msg
});

  
  main.on('click', 'down', function(e) {
   var about = new UI.Card({scrollable: true,});
    about.title('About us:');
    about.subtitle('Los Ñames:');
   about.body('Omar \nAlejandro \nIsrael \nJose');
   about.show();
  }); //waits for down button press to display the 'about us' card 