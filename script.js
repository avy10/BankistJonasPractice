// BANKIST APP

// Data
const account1 = {
	owner: 'Jonas Schmedtmann',
	movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
	interestRate: 1.2, // %
	pin: 1111,

	movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
	owner: 'Jessica Davis',
	movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
	interestRate: 1.5,
	pin: 2222,
	movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
	owner: 'Steven Thomas Williams',
	movements: [200, -200, 340, -300, -20, 50, 400, -460],
	interestRate: 0.7,
	pin: 3333,

	movementsDates: [
		"2020-01-05T14:30:00.000Z",
		"2020-02-10T09:45:00.000Z",
		"2020-03-20T11:15:00.000Z",
		"2020-04-15T17:30:00.000Z",
		"2020-05-22T13:00:00.000Z",
		"2020-06-30T15:15:00.000Z",
		"2020-07-18T08:45:00.000Z",
		"2020-08-25T10:30:00.000Z",
	],
	currency: "NZD",
	locale: "en-NZ",
};

const account4 = {
	owner: 'Sarah Smith',
	movements: [430, 1000, 700, 50, 90],
	interestRate: 1,
	pin: 4444,

	movementsDates: [
		"2020-01-15T09:30:00.000Z",
		"2020-02-01T14:45:00.000Z",
		"2020-03-10T10:20:00.000Z",
		"2020-04-05T18:00:00.000Z",
		"2020-05-12T12:30:00.000Z",
		"2020-06-20T16:45:00.000Z",
		"2020-07-08T09:15:00.000Z",
		"2020-08-22T11:00:00.000Z",
	],
	currency: "INR",
	locale: "en-IN",
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let currentAccount;
/////////////////////////////////////////////////
// 12.5 adding dates


const displayTime = () => {
	const currentDate = new Date();
	/* const currentDateDay = currentDate.getDate();
	const currentDateMonth = currentDate.getMonth() +1 ;
	const currentDateYear = currentDate.getFullYear();
	const currentHour = currentDate.getHours();
	const currentMins = currentDate.getMinutes(); */

	const currentDateDay = `${currentDate.getDate()}`;
	const currentDateMonth = `${currentDate.getMonth() +1}`.padStart(2, 0) ;
	const currentDateYear = `${currentDate.getFullYear()}`.padStart(2, 0);
	const currentHour = `${currentDate.getHours()}`.padStart(2, 0);
	const currentMins = `${currentDate.getMinutes()}`.padStart(2, 0);

	const dateStr = `${currentDateDay}/${currentDateMonth}/${currentDateYear}, ${currentHour}:${currentMins}`;
	// when the date is single digit, we would want to pad it with 0 i.e. instead of 9/2/2023 we want 09/02/2023 
	// for that convert the components of dateStr into an string and then use padStart
	// padStart(lengthOfStringWeWant, what should the prefix be for padding)
	labelDate.textContent = dateStr;
}




// 08 adding DOM

const displayMovements = function(obj, truth = false){

	
	// 
	let movements;
	if(truth){
		movements = obj.sortedMovs;	
	} else{
		movements = obj.movements;
	}
	console.log("YOOOO",obj.movements);
	containerMovements.innerHTML = "";
	movements.forEach((element, index) => {
		const typeOfAction = element > 0 ? "deposit" : "withdrawal";
		//calculating dates
				// const currentDate = obj.movementsDates[index] ? new Date(obj.movementsDates[index]) : new Date();
				// not optimal cz while we might add date to the dom, we are not storing it in array so we loose data
				// instead do a push to movementsDates array in the transfer
		const currentDate = new Date(obj.movementsDates[index]);
		const currentDateDay = `${currentDate.getDate()}`;
		const currentDateMonth = `${currentDate.getMonth() +1}`.padStart(2, 0) ;
		const currentDateYear = `${currentDate.getFullYear()}`.padStart(2, 0);
		const currentHour = `${currentDate.getHours()}`.padStart(2, 0);
		const currentMins = `${currentDate.getMinutes()}`.padStart(2, 0);

		const dateOfTransaction = `${currentDateDay}/${currentDateMonth}/${currentDateYear}, ${currentHour}:${currentMins}`;
		


		const html = `
			<div class="movements__row">
			<div class="movements__type movements__type--${typeOfAction}">${index + 1} ${typeOfAction}</div>
			<div class="movements__date">${dateOfTransaction}</div>
			<div class="movements__value">${element.toFixed(2)}</div>
			</div>
		`;
		containerMovements.insertAdjacentHTML("afterbegin", html);
		// in afterbegin, the order of the div.movements_row element is: newest element to the top i.e. each new element is added before the last added container
		// in beforeend, the order of div.movements_row element would be : newest element to the bottom i.e. each new element is added after the last added container
	});	
};

// displayMovements(account1.movements);
// console.log(containerMovements.innerHTML);

// computing usernames
const addUserName = (accounts) => {
    accounts.forEach((element, index, array) => {
        element.userName = element.owner
                            .toLowerCase()
                            .split(" ")
                            .map(singleName => singleName[0])
                            .join("");
    });
}

addUserName(accounts);
accounts.forEach(e => {
    console.log(e.userName);
});


// 14 calculating final balance
const calcPrintBal = function(movements){
	const balance = movements.reduce(function(accumulator, element, index, array){
		return accumulator += element;
	}, 0);
	console.log(balance);
	return balance;

}

//16 CALCULATING INCOME OUTCOME INTEREST 
const displaySummary = function(accountObj){
	
	const totalIn = accountObj.movements.filter((element, index, array) => element > 0)
							.reduce((sum, element) => sum += element, 0);
	labelSumIn.textContent = "";
	labelSumIn.textContent = totalIn;

	const totalOut = accountObj.movements.filter(element => element < 0).reduce((sum, element) => sum += element, 0);
	labelSumOut.textContent = ""; 
	labelSumOut.textContent = `${Math.abs(totalOut.toFixed(2))}`; 

	const interestRate = accountObj.interestRate;
	const totalInterest = accountObj.movements.filter(element => element > 0)
											  .map(element => element * interestRate / 100)
											  .filter(element => element >= 1)
											  .reduce((sum, element) => sum += element, 0);
	labelSumInterest.textContent = "";
	labelSumInterest.textContent = totalInterest.toFixed(2);
}

// 14
const displayBalance = function(accountObj){
	const balance = calcPrintBal(accountObj.movements);
	accountObj.balance = balance;
	labelBalance.textContent = `${balance.toFixed(2)} INR`;
	displaySummary(accountObj);
	displayTime();

}

// displayBalance(account1);


// 19 event listener for login button
btnLogin.addEventListener("click", function(event){
	// prevent form from submitting
	event.preventDefault();
	currentAccount = accounts.find(acc => acc.userName === inputLoginUsername.value);
	if(currentAccount?.pin === Number(inputLoginPin.value)){
		// display UI and a welcome message
		labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(" ")[0]}`;
		containerApp.style.opacity = 100;
		// display movements
		console.log("currentAccount", currentAccount);
		displayMovements(currentAccount);
		// display balance and // display summary
		displayBalance(currentAccount);
		
		// clear input fields
		inputLoginUsername.value = inputLoginPin.value = ""; // care this
		inputLoginPin.blur();
		inputLoginUsername.blur();
		// The blur() method removes focus from an element.


	}
	console.log(currentAccount);
});

// 20 implementing transfers
btnTransfer.addEventListener("click", function(event){
    event.preventDefault();
    const transferAmount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(acc => acc.userName === inputTransferTo.value);
	console.log(transferAmount, receiverAcc);
    if(receiverAcc && transferAmount > 0 && transferAmount <= currentAccount.balance && receiverAcc.userName !== currentAccount.userName){
        transferAmount !== 0 && currentAccount.movements.push(-1 * transferAmount);
        receiverAcc?.movements.push(transferAmount);
		// use toISOString on dates as that is how the previous dates has been stored.
		// because new Date() gives us a date object : Date Sat Dec 23 2023 05:34:32 GMT+0530 (India Standard Time)
		currentAccount.movementsDates.push(new Date().toISOString());
		receiverAcc.movementsDates.push(new Date().toISOString());
        displayMovements(currentAccount);
        calcPrintBal(currentAccount.movements);
        displayBalance(currentAccount);
    }
    inputTransferAmount.value = inputTransferTo.value = "";
    inputTransferTo.blur();
    btnTransfer.blur();
    
});

// 22 implementing loan request
btnLoan.addEventListener("click", function(event){
	event.preventDefault();
	const amount = Math.floor((inputLoanAmount.value));
	if(amount > 0 && currentAccount.movements.some((e) => e >= amount * 0.1)){
		// add movement
		currentAccount.movements.push(amount);
		currentAccount.movementsDates.push(new Date().toISOString());
		displayBalance(currentAccount);
		displayMovements(currentAccount);

	}
	inputLoanAmount.value = "";
	inputLoanAmount.blur();
})

// 21 implementing account deletion
btnClose.addEventListener("click", function(event){
    event.stopPropagation();
	event.preventDefault();
	const enteredUser = inputCloseUsername.value;
	const enteredPin = Number(inputClosePin.value);
    if(enteredUser === currentAccount.userName && enteredPin == currentAccount.pin){
		const index = accounts.findIndex((acc) => acc.userName === currentAccount.userName);
		console.log(index);
		accounts.splice(index, index+1);
		console.log(accounts);


		labelWelcome.textContent = "Log in to get started";
		inputClosePin.value = inputCloseUsername.value = "";
		inputClosePin.blur();

		// hide UI
		containerApp.style.opacity = 0;
	}
});


// 23 bank wants to calculate overall balance it has i.e. sum of money present in all the account it has
function avyTotalMoneyCalc(accounts){
	const allTheMoney = [];
	accounts.forEach(e => {
		allTheMoney.push(e.movements);
	});

    const allTheMoneyFLAT = allTheMoney.flat();
    const onlyDeposits = allTheMoneyFLAT.filter((element, index, array) => element > 0);
    const totalMoney = onlyDeposits.reduce((sum, element, index, array) => sum +=element, 0);
	console.log(totalMoney);
    // JONAS used maps
    const accountMovements = accounts.map(element => element.movements);
    console.log(accountMovements);

    const acountBalance = accounts.map(element => element.movements)
                                 .flat()
                                 .reduce((sum, ele) => sum += ele, 0);
    console.log(acountBalance);

    // FLATMAP
    const accountBalance2 = accounts.flatMap(ele => ele.movements).reduce((sum, ele) => sum += ele, 0);
    console.log(accountBalance2);
}

avyTotalMoneyCalc(accounts);


// 24 sort the movements in descending order
let didWeSort = false;
btnSort.addEventListener("click", function(event){
	event.preventDefault();
	didWeSort = didWeSort === true ? false : true;
	if(didWeSort){
		currentAccount.sortedMovs = currentAccount.movements.slice().sort((a, b) => a - b);
		displayMovements(currentAccount, didWeSort);
	} else if(!didWeSort){
		displayMovements(currentAccount, didWeSort);
	}
})

//12.4 using toFixed and Math.floor

			// faking the login
			currentAccount = account1;
			displayBalance(currentAccount);
			displayMovements(currentAccount);
			containerApp.style.opacity = 100;
					

// 12.5 adding dates
