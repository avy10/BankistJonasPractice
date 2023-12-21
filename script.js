// BANKIST APP

// Data
const account1 = {
	owner: 'Jonas Schmedtmann',
	movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
	interestRate: 1.2, // %
	pin: 1111,
};

const account2 = {
	owner: 'Jessica Davis',
	movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
	interestRate: 1.5,
	pin: 2222,
};

const account3 = {
	owner: 'Steven Thomas Williams',
	movements: [200, -200, 340, -300, -20, 50, 400, -460],
	interestRate: 0.7,
	pin: 3333,
};

const account4 = {
	owner: 'Sarah Smith',
	movements: [430, 1000, 700, 50, 90],
	interestRate: 1,
	pin: 4444,
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

/////////////////////////////////////////////////
// 08 adding DOM

const displayMovements = function(movements){
	containerMovements.innerHTML = "";
	movements.forEach((element, index) => {
		const typeOfAction = element > 0 ? "deposit" : "withdrawal";
		const html = `
			<div class="movements__row">
			<div class="movements__type movements__type--${typeOfAction}">${index + 1} ${typeOfAction}</div>
			<div class="movements__date">3 days ago</div>
			<div class="movements__value">${element}</div>
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
	labelSumOut.textContent = `${Math.abs(totalOut)}`; 

	const interestRate = accountObj.interestRate;
	const totalInterest = accountObj.movements.filter(element => element > 0)
											  .map(element => element * interestRate / 100)
											  .filter(element => element >= 1)
											  .reduce((sum, element) => sum += element, 0);
	labelSumInterest.textContent = "";
	labelSumInterest.textContent = totalInterest;
}

// 14
const displayBalance = function(accountObj){
	const balance = calcPrintBal(accountObj.movements);
	labelBalance.textContent = `${balance} INR`;
	displaySummary(accountObj);

}

displayBalance(account1);


// 19 event listener for login button
let currentAccount;
btnLogin.addEventListener("click", function(event){
	// prevent form from submitting
	event.preventDefault();
	currentAccount = accounts.find(acc => acc.userName === inputLoginUsername.value);
	if(currentAccount?.pin === Number(inputLoginPin.value)){
		// display UI and a welcome message
		labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(" ")[0]}`;
		containerApp.style.opacity = 100;
		// display movements
		displayMovements(currentAccount.movements);
		// display balance and // display summary
		displayBalance(currentAccount);
		
		// clear input fields
		inputLoginUsername.value = inputLoginPin.value = ""; // care this
		inputLoginPin.blur();
		// The blur() method removes focus from an element.


	}
	console.log(currentAccount);
});

// 20 implementing transfers
btnTransfer.addEventListener("click", function(event){
    event.preventDefault();
    const transferAmount = Number(inputTransferAmount.value);
    console.log(transferAmount)
    const receiverAcc = accounts.find(acc => acc.userName === inputTransferTo.value);
    if(receiverAcc && transferAmount > 0 && transferAmount <= currentAccount.balance && receiverAcc.userName !== currentAccount.userName){
        transferAmount !== 0 && currentAccount.movements.push(-1 * transferAmount);
        receiverAcc?.movements.push(transferAmount);
        displayMovements(currentAccount.movements);
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
	const amount = Number(inputLoanAmount.value);
	if(amount > 0 && currentAccount.movements.some((e) => e >= amount * 0.1)){
		// add movement
		currentAccount.movements.push(amount);
		displayBalance(currentAccount);
		displayMovements(currentAccount.movements);

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
		const sortedMovs = currentAccount.movements.slice().sort((a, b) => a - b);
		displayMovements(sortedMovs);
	} else if(!didWeSort){
		displayMovements(currentAccount.movements);
	}
})