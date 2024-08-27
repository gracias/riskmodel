// Constants
const Pi = Math.PI;
const Threshold = 2;

// Variables to manage the model and simulation

let portSize;               // PortSize - The size of the portfolio
let finalPremRate;          // FinalPremRate - The final premium rate
let claimRate;              // ClaimRate - The rate of mortality decrement
let netPremMargins;         // NetPremMargins - Loading applicable to claim rate
let perMillePremLoad;       // PerMillePremLoad - Capital charges (in per mille terms)
let grossPremMargins;       // GrossPremMargins - Commissions or similar margins
let profitShareLoading;     // PSLoading - Profit share loading (calculated)
let nonProfitPremRate;      // NonProfitPremRate - Non-profit premium rate
let aveSumInsured;          // AveSumInsured - Average sum insured of the portfolio
let stDevSumInsured;        // StDevSumInsured - Standard deviation of the sum insured
let logMu, logSigma;        // LogMu, LogSigma - Parameters for log-normal distribution
let psPercProf;             // PSPercProf - Percentage of profit refunded
let psPercExp;              // PSPercExp - Percentage of premium used in profit calculation
let simulations;            // Simulations - Number of simulations to run
let interest;               // Interest - Interest rate applied to calculations
let expectedNumberOfClaims; // ExpectedNumberOfClaims - Expected number of claims in simulations
let numberOfClaims = [];    // Array to store the number of claims in each simulation
let claimsCost = [];        // Array to store the cost of claims in each simulation
let premium;                // Premium - The calculated premium value
let profitShare = [];       // Array to store the profit share for each simulation
let profit = [];            // Array to store the profit for each simulation
let averagePVProfit = 0;    // Average present value of profit over all simulations
let totalPVExpectedProfit = 0; // Total present value of expected profit

// Function to log entry and exit of functions
function logEntryExit(logType, funcName, params = {}) {
    if (logType === 'entry') {
        console.log(`Entering function ${funcName} with parameters:`, params);
    } else if (logType === 'exit') {
        console.log(`Exiting function ${funcName}`);
    }
}

function initialiseVariables() {
    logEntryExit('entry', 'initialiseVariables');

    // Replace these with actual input data or user inputs
    portSize = 200;                // PortSize 
    claimRate = 0.02;            // ClaimRate  (e.g., 2% as 0.02)
    aveSumInsured = 10000;       // AveSumInsured 
    stDevSumInsured = 2000;      // StDevSumInsured 
    netPremMargins = 0.05;       // NetPremMargins  (e.g., 5% as 0.05)
    perMillePremLoad = 0.001;    // PerMillePremLoad  (e.g., 0.1% as 0.001)
    grossPremMargins = 0.1;      // GrossPremMargins  (e.g., 10% as 0.1)
    psPercProf = 0.5;            // PSPercProf  (e.g., 50% as 0.5)
    psPercExp = 0.9;             // PSPercExp  (e.g., 90% as 0.9)
    simulations = 50000;            // Simulations 
    interest = 0.03;             // Interest  (e.g., 3% as 0.03)

    profitShareLoading = 0;      // Initial profit share loading (calculated)
    logSigma = Math.sqrt(Math.log(Math.pow(stDevSumInsured / aveSumInsured, 2) + 1));
    logMu = Math.log(aveSumInsured) - 0.5 * Math.pow(logSigma, 2);

    logEntryExit('exit', 'initialiseVariables');
}

// Poisson distribution function to generate random number of claims
function poisson(lambda) {
    logEntryExit('entry', 'poisson', { lambda });

    let L = Math.exp(-lambda);
    let p = 1;
    let k = 0;

    do {
        k++;
        p *= Math.random();
    } while (p > L);

    logEntryExit('exit', 'poisson', { result: k - 1 });
    return k - 1;
}

function simulateClaimNumbers() {
    logEntryExit('entry', 'simulateClaimNumbers');

    expectedNumberOfClaims = portSize * claimRate;
    numberOfClaims = Array(simulations).fill(0).map(() => poisson(expectedNumberOfClaims));

    logEntryExit('exit', 'simulateClaimNumbers', { expectedNumberOfClaims });
}

// Function to calculate the sum of N Log-Normal distributed variables
function sumLogNormal(N) {
    logEntryExit('entry', 'sumLogNormal', { N });

    let LNRes = 0;

    if (N === 0) return 0;

    for (let i = 0; i < Math.floor(N / 2); i++) {
        logEntryExit('entry', 'sumLogNormal_loop', { iteration: i });

        let R1 = Math.max(Math.random(), 1e-16);
        let R2 = Math.random();

        let X1 = Math.sqrt(-2 * Math.log(R1)) * Math.cos(2 * Pi * R2);
        let X2 = Math.sqrt(-2 * Math.log(R1)) * Math.sin(2 * Pi * R2);

        X1 = Math.exp(X1 * logSigma + logMu);
        X2 = Math.exp(X2 * logSigma + logMu);

        LNRes += X1 + X2;

        logEntryExit('exit', 'sumLogNormal_loop', { iteration: i, X1, X2, LNRes });
    }

    if (N % 2 === 1) {
        let R1 = Math.max(Math.random(), 1e-16);
        let R2 = Math.random();

        let X1 = Math.sqrt(-2 * Math.log(R1)) * Math.cos(2 * Pi * R2);
        X1 = Math.exp(X1 * logSigma + logMu);

        LNRes += X1;
    }

    logEntryExit('exit', 'sumLogNormal', { LNRes });
    return LNRes;
}

// Function to simulate the cost of claims using Log-Normal distribution    
function simulateClaimsCost() {
    logEntryExit('entry', 'simulateClaimsCost');

    claimsCost = numberOfClaims.map(n => sumLogNormal(n));

    logEntryExit('exit', 'simulateClaimsCost');
}

function calculateProfitShare() {
    logEntryExit('entry', 'calculateProfitShare');

    profitShare = [];
    profit = [];
    averagePVProfit = 0;
    premium = portSize * finalPremRate * aveSumInsured;

    for (let j = 0; j < simulations; j++) {
        logEntryExit('entry', 'calculateProfitShare_loop', { iteration: j });

        let profitAccount = psPercExp * premium - claimsCost[j];
        profitShare[j] = profitAccount > 0 ? psPercProf * profitAccount : 0;
        profit[j] = premium - claimsCost[j] * Math.pow(1 + interest, -0.5) - 
            profitShare[j] * Math.pow(1 + interest, -1);
        averagePVProfit += profit[j];

        logEntryExit('exit', 'calculateProfitShare_loop', { iteration: j, profitAccount, profitShare: profitShare[j], profit: profit[j] });
    }

    averagePVProfit /= simulations;
    premium += totalPVExpectedProfit - averagePVProfit;
    profitShareLoading = premium / (nonProfitPremRate * portSize * aveSumInsured) - 1;
    console.log('profitShareLoading: ', profitShareLoading);

    logEntryExit('exit', 'calculateProfitShare', { averagePVProfit, profitShareLoading });
}
function calculatePremium() {
    logEntryExit('entry', 'calculatePremium');

    nonProfitPremRate = (claimRate * (1 + netPremMargins) + perMillePremLoad) / (1 - grossPremMargins);
    finalPremRate = nonProfitPremRate * (1 + profitShareLoading);

    totalPVExpectedProfit = portSize * (nonProfitPremRate * (1 - grossPremMargins) + 
        finalPremRate * grossPremMargins - claimRate * Math.pow(1 + interest, -0.5)) * 
        aveSumInsured;

    logEntryExit('exit', 'calculatePremium');
}

// Function to simulate participation and profit-sharing process
function simulate() {
    logEntryExit('entry', 'simulate');

    initialiseVariables();  // Initialize the variables with values
    calculatePremium();     // Calculate the initial premium

    // Loop until the result stabilizes (converges)
    let count = 5;
    while (count > Threshold) {
        logEntryExit('entry', 'simulate_loop', { count });
        
        simulateClaimNumbers();  // Simulate the number of claims
        simulateClaimsCost();    // Simulate the cost of claims
        calculateProfitShare();  // Calculate profit share for each simulation
        calculatePremium();      // Recalculate the premium based on new values

        count--;
        logEntryExit('exit', 'simulate_loop');
    }

    logEntryExit('exit', 'simulate');
}

// Call the main function to start the simulation
simulate();