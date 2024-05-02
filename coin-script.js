
let heads = 0;
let tails = 0;

// Dom elements fuctionality
let coin = document.querySelector(".coin");
let flipBtn = document.querySelector("#flip-button");
let resetBtn = document.querySelector("#reset-button");

// Event lister for button
flipBtn.addEventListener("click", () => {
    let i = Math.floor(Math.random() * 2);
    coin.style.animation = "none";
    if(i){
        setTimeout(function(){
            coin.style.animation = "spin-heads 1.25s forwards";  // Update animation
        }, 100);
        heads++;
    }
    else{
        setTimeout(function(){
            coin.style.animation = "spin-tails 1.25s forwards"; // Update animation
        }, 100);
        tails++;
    }
    setTimeout(updateStats, 1250);
    disableButton(); 
});

function updateStats(){
    document.querySelector("#heads-count").textContent = `Heads: ${heads}`;
    document.querySelector("#tails-count").textContent = `Tails: ${tails}`;
}

// Disable button for multiple click instances
function disableButton(){ 
    flipBtn.disabled = true;
    setTimeout(function(){
        flipBtn.disabled = false;
    },1250);
}

// Reset button
resetBtn.addEventListener("click",() => {  
    coin.style.animation = "none";
    heads = 0;
    tails = 0;
    updateStats();
});