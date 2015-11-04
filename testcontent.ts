var x = 5;
;

function test(): void {
    var x = 5;
    switch (x) {
        case 1:
            console.log("ha");
        case 2:
            console.log("haha");
        case 5:
            console.log("hahahahaha");
    }
}


function test2(): void {
    try {
        var x = 5;
    }
    catch (ex) {
        console.log("exception");
    }
}