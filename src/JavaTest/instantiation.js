class Person{
    constructor(name, lastName){
        this.name = name;
        this.lastName = lastName;
    }

    getName(){
        return this.name + ' ' + this.lastName;
    }
};

const robin = new Person('Robin', 'Wieruch');
console.log(robin.getName());

const dennis = new Person('Dennis', 'Wieruch');
console.log(dennis.getName());