const TIME_BUTTON = 900003;

function getButton() {
    return document.querySelectorAll('button.ScCoreButton-sc-1qn4ixc-0.ScCoreButtonSuccess-sc-1qn4ixc-5')[0];
}

function farm() {
    setTimeout(() => {
        getButton().click();
        farm();
    }, TIME_BUTTON);
}


function main () {
    farm();
}

main();
