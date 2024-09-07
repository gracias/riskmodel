// code setup for calculations

// data = sum_assured_data[start, port_size]
// we already have this which is taking a section of the entire insurance table
// depending on portfolio size 
const data = [400000, 291000, 289000, 459000, 285000];

const claimRate = 0.02; // as already cal in earlier code
const netPremMargins = 0.05; // static value as initialised earlier
const perMillePremLoad = 0.001; // static value as initialised earlier
const grossPremMargins = 0.1; // static value as initialised earlier

const psLoading =  0.000569003265265433; // new variable introduced as static value


function totalPremiumReceived() {
    let grossPremium = (claimRate * (1 + netPremMargins) + perMillePremLoad) / (1 - grossPremMargins) * (1 + psLoading)

    let totalSumAssured = data.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    let totalPremiumReceived = (totalSumAssured * grossPremium)/1000;

    return totalPremiumReceived;
}


var totalPremium = totalPremiumReceived();

const lossData = data.map(value => value > totalPremium ? value - totalPremium : 0);

console.log('sum assured data: ', data);
console.log('loss data: ', lossData); 

// calculate kth percentile loss using earlier logic on lossData
// or better still take value of lossData using the same index i earlier found when calculating kth percentile on claim cost.