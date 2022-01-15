'use strict';
const assert = require('assert');
const { arrayBuffer } = require('stream/consumers');

class BankAccount {
    constructor(accountNumber, owner){
        this.accountNumber = accountNumber;
        this.owner = owner;
        this.transactions = [];
    }
    balance = () => {
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        return this.transactions.map((obj) => { return obj.amount}).reduce(reducer, 0);
    }
    // This method does not take any input, and returns the current balance on the account. The balance is computed by summing up the amounts in the transactions array.
    deposit = (amt) =>{
         if(amt <= 0){
            console.log('Enter amount greater than zero.')
        } else {
            let newTransaction = new Transaction(amt, 'Deposit')
            this.transactions.push(newTransaction)
        }
        return console.log(this.transactions)
    }

    // This method takes in a single input, the deposit amount. This method should create a new transaction representing the deposit, and add it to the transactions array.
    //  You should not be able to deposit a negative amount
    charge = (payee, amt) =>{
        if(amt > 0){
            let newTransaction = new Transaction(amt, payee)
            this.transactions.push(newTransaction)
        } else {
            console.log('you dont want my money?')
        }
        return console.log(this.transactions)
    }
    //This method takes in the payee and amount, creates a new transaction with the payee and amount, and adds the transaction to the transaction array.
    // You should not be able to charge an amount that would make your balance dip below 0
}

class Transaction {
    constructor(amount, payee) {
        this.amount = amount;
        this.payee = payee;
        this.date = new Date();
    }
}



if (typeof describe === 'function'){
    describe('BankAccount', function(){
        it("Should have an account number, owner's name and a transaction list", function(){
            const bankAccount1 = new BankAccount('1234567', 'Michael H.'); 
            assert.equal(bankAccount1.accountNumber, '1234567');
            assert.equal(bankAccount1.owner, 'Michael H.')
            assert.equal(bankAccount1.transactions.length, 0)
            assert.equal(bankAccount1.balance(), 0)
            // assert.equal(bankAccount1.transactions, []) 
            // why does this not work but when failed says [] == [] ??? 

        })
    })

    describe("testing transaction creation", function(){
        it("should create transaction correctly", function(){
            let t1 = new Transaction(30, 'Deposit');
            assert.equal(t1.amount, 30);
            assert.equal(t1.payee, 'Deposit');
            assert.notEqual(t1.date, undefined)
            assert.notEqual(t1.date, null)
        })
    })
    it("should create transaction correctly for a charge", function(){
        let t1 = new Transaction(-34, 'Target');
        assert.equal(t1.amount, -34);
        assert.equal(t1.payee, 'Target');
        assert.notEqual(t1.date, undefined)
        assert.notEqual(t1.date, null)
    })
}






//if describe is a function the use a # in front else use ''