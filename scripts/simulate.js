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

    logEntryExit('exit', 'initialiseVariables');
}
function simulateClaimNumbers() {
    logEntryExit('entry', 'simulateClaimNumbers');

    logEntryExit('exit', 'simulateClaimNumbers');
}
function simulateClaimsCost() {
    logEntryExit('entry', 'simulateClaimsCost');

    logEntryExit('exit', 'simulateClaimsCost');
}
function calculateProfitShare() {
    logEntryExit('entry', 'calculateProfitShare');

    logEntryExit('exit', 'calculateProfitShare');
}
function calculatePremium() {
    logEntryExit('entry', 'calculatePremium');

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