const prompt = require("prompt-sync")();

/******************************
 * 
 *      Console interface
 * 
 * ******************************/
console.log("----> A lycanthrope's log");
console.log("----> Hi jacques, i'm maurice, i'll help you record your events");
console.log("----> Lets track your events for 5 days and determine the cause of your transformation");
console.log("===========================================================");
console.log("----> hint: Enter single word only, No phrases/clauses allowed)");



let journal = [];

function addEvent(events, transformation) {
    journal.push({events, transformation});
}


//addEvent(['eat, sleep, fight'], true);
//addEvent(['shit, smoke, drink'], false);

//console.log(journal);







/******************************
 * 
 *      Data collection
 * 
 * ******************************/
class inputSession {

    constructor(day){

        this.day = day;

        this.temp = {arr: [], trans: ''};

    }

    session(){

        console.log("------------------------------------------------------------");
        console.log(`Enter the events of Day ${this.day}: (type 'done' when you're done)`);


        while (true) {

            let input = prompt('Enter event: > ');
        
            if (input === "done") {

                let trans = prompt("Did you turn to a werewolf today? (Enter 'y' for yes or 'n' for no)> ");

                if (trans === 'y') {
                    this.temp.trans = true;
                    break;
                } else {
                    this.temp.trans = false;
                    break;
                }
                

            }

            this.temp.arr.push(input);
        
        
        }

        addEvent(this.temp.arr, this.temp.trans);

    }


}


let day1 = new inputSession(1);
day1.session();
let day2 = new inputSession(2);
day2.session();
let day3 = new inputSession(3);
day3.session();
//console.log(journal);
let day4 = new inputSession(4);
day4.session();
let day5 = new inputSession(5);
day5.session();




function phi(table) {
    return (table[3] * table[0] - table[2] * table[1]) /
        Math.sqrt((table[2] + table[3]) *
                    (table[0] + table[1]) *
                    (table[1] + table[3]) *
                    (table[0] + table[2]));
}


function tableFor(event, journal) {

    let table = [0,0,0,0];
    for (let i = 0; i < journal.length; i++) {
        let entry = journal[i], index = 0;
        if (entry.events.includes(event)) index += 1;
        if (entry.transformation) index += 2;
        table[index] += 1;
    }
    return table;
}


let dayIdx = 0;
for (const entry of journal) {
    dayIdx++;
    console.log('------------------------------------------------------------');
    console.log(`There's a total of ${entry.events.length} events day`+dayIdx);
}

function journalEvents(journal) {
    
    let events = [];
    for (const entry of journal) {
        for (const event of entry.events) {
            if (!events.includes(event)) {
                events.push(event);
            }
        }
    }
    return events;

}


for (const event of journalEvents(journal)) {
    console.log(event + ':', phi(tableFor(event, journal)));
}


for (const event of journalEvents(journal)) {
    if (phi(tableFor(event, journal)) == 1) {
        console.log("---------------------------------------------------------");
        console.log("Your condition is most likely caused caused by: " + event);
        console.log("Above you can find the result log of all your events where '1' is the most likely cause and '-1' the most likely inhibitor ");
    }
}
