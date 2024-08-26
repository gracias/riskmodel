// Constants
const Pi = Math.PI;

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