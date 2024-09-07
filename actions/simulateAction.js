// QmTtyEnaJxW9DxobCGjnrqs7d2pZZPtbJA72QZzbpzM9CS
const go = async () => {
    let data = await Lit.Actions.decryptAndCombine({
        accessControlConditions,
        ciphertext,
        dataToEncryptHash,
        authSig: null,
        chain: 'ethereum',
    });

    data = JSON.parse(data)

    // Function to simulate participation and profit-sharing process
    function simulate(data) {

        // params passed : portSize, simulations, percentile

        const Pi = Math.PI;


        // Variables to manage the model and simulation
        const Threshold = data.Threshold;



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
        let interest;               // Interest - Interest rate applied to calculations
        let expectedNumberOfClaims; // ExpectedNumberOfClaims - Expected number of claims in simulations
        let numberOfClaims = [];    // Array to store the number of claims in each simulation
        let claimsCost = [];        // Array to store the cost of claims in each simulation
        let premium;                // Premium - The calculated premium value
        let profitShare = [];       // Array to store the profit share for each simulation
        let profit = [];            // Array to store the profit for each simulation
        let averagePVProfit;    // Average present value of profit over all simulations
        let totalPVExpectedProfit; // Total present value of expected profit

        function initialiseVariables(data) {


            // Replace these with actual input data or user inputs

            claimRate = data.claimRate;
            aveSumInsured = data.aveSumInsured;
            stDevSumInsured = data.stDevSumInsured;
            netPremMargins = data.netPremMargins;
            perMillePremLoad = data.perMillePremLoad;
            grossPremMargins = data.grossPremMargins;
            psPercProf = data.psPercProf;
            psPercExp = data.psPercExp;
            averagePVProfit = data.averagePVProfit;
            totalPVExpectedProfit = data.totalPVExpectedProfit;
            interest = data.interest;

            profitShareLoading = data.profitShareLoading;
            logSigma = Math.sqrt(Math.log(Math.pow(data.stDevSumInsured / data.aveSumInsured, 2) + 1));
            logMu = Math.log(data.aveSumInsured) - 0.5 * Math.pow(logSigma, 2);


        }


        // Poisson distribution function to generate random number of claims
        function poisson(lambda) {


            let L = Math.exp(-lambda);
            let p = 1;
            let k = 0;

            do {
                k++;
                p *= Math.random();
            } while (p > L);


            return k - 1;
        }

        function simulateClaimNumbers() {


            expectedNumberOfClaims = portSize * claimRate;
            numberOfClaims = Array(simulations).fill(0).map(() => poisson(expectedNumberOfClaims));


        }

        // Function to calculate the sum of N Log-Normal distributed variables
        function sumLogNormal(N) {

            let LNRes = 0;

            if (N === 0) return 0;

            for (let i = 0; i < Math.floor(N / 2); i++) {


                let R1 = Math.max(Math.random(), 1e-16);
                let R2 = Math.random();

                let X1 = Math.sqrt(-2 * Math.log(R1)) * Math.cos(2 * Pi * R2);
                let X2 = Math.sqrt(-2 * Math.log(R1)) * Math.sin(2 * Pi * R2);

                X1 = Math.exp(X1 * logSigma + logMu);
                X2 = Math.exp(X2 * logSigma + logMu);

                LNRes += X1 + X2;


            }

            if (N % 2 === 1) {
                let R1 = Math.max(Math.random(), 1e-16);
                let R2 = Math.random();

                let X1 = Math.sqrt(-2 * Math.log(R1)) * Math.cos(2 * Pi * R2);
                X1 = Math.exp(X1 * logSigma + logMu);

                LNRes += X1;
            }


            return LNRes;
        }

        // Function to simulate the cost of claims using Log-Normal distribution    
        function simulateClaimsCost() {

            claimsCost = numberOfClaims.map(n => sumLogNormal(n));


        }

        function calculateProfitShare() {


            profitShare = [];
            profit = [];
            averagePVProfit = 0;
            premium = portSize * finalPremRate * aveSumInsured;

            for (let j = 0; j < simulations; j++) {


                let profitAccount = psPercExp * premium - claimsCost[j];
                profitShare[j] = profitAccount > 0 ? psPercProf * profitAccount : 0;
                profit[j] = premium - claimsCost[j] * Math.pow(1 + interest, -0.5) -
                    profitShare[j] * Math.pow(1 + interest, -1);
                averagePVProfit += profit[j];


            }

            averagePVProfit /= simulations;
            premium += totalPVExpectedProfit - averagePVProfit;
            profitShareLoading = premium / (nonProfitPremRate * portSize * aveSumInsured) - 1;



        }
        function calculatePremium() {


            nonProfitPremRate = (claimRate * (1 + netPremMargins) + perMillePremLoad) / (1 - grossPremMargins);
            finalPremRate = nonProfitPremRate * (1 + profitShareLoading);

            totalPVExpectedProfit = portSize * (nonProfitPremRate * (1 - grossPremMargins) +
                finalPremRate * grossPremMargins - claimRate * Math.pow(1 + interest, -0.5)) *
                aveSumInsured;


        }

        function calculatePercentile(arr, percentile) {
            if (!Array.isArray(arr) || arr.length === 0) {
                throw new Error('Input must be a non-empty array');
            }

            if (percentile <= 0 || percentile >= 100) {
                throw new Error('Percentile must be between 0 and 100');
            }

            // Sort the array
            arr.sort((a, b) => a - b);

            // Calculate the index
            const index = (percentile / 100) * (arr.length - 1);

            // Handle exact index or interpolation
            const lowerIndex = Math.floor(index);
            const upperIndex = Math.ceil(index);

            if (lowerIndex === upperIndex) {
                return arr[lowerIndex];
            }

            const lowerValue = arr[lowerIndex];
            const upperValue = arr[upperIndex];

            // Interpolate between the two values
            return Math.round(lowerValue + (upperValue - lowerValue) * (index - lowerIndex));
        }


        initialiseVariables(data);  // Initialize the variables with values
        calculatePremium();     // Calculate the initial premium

        // Loop until the result stabilizes (converges)
        while (Math.abs(totalPVExpectedProfit / averagePVProfit - 1) > Threshold) {


            simulateClaimNumbers();  // Simulate the number of claims
            simulateClaimsCost();    // Simulate the cost of claims
            calculateProfitShare();  // Calculate profit share for each simulation
            calculatePremium();      // Recalculate the premium based on new values


        }

        const percentileClaims = calculatePercentile(numberOfClaims, percentile)
        const medianClaims = calculatePercentile(numberOfClaims, 50)
        const percentileClaimsCost = calculatePercentile(claimsCost, percentile)
        const percentileProfitShare = calculatePercentile(profitShare, percentile)
        const medianClaimsCost = calculatePercentile(claimsCost, 50)
        const medianProfitShare = calculatePercentile(profitShare, 50)

        return {
            percentileClaims,
            medianClaims,
            percentileClaimsCost,
            percentileProfitShare,
            medianClaimsCost,
            medianProfitShare
        }



    }

    const result = simulate(data)
    const actionResult = JSON.stringify(result)

    Lit.Actions.setResponse({ response: JSON.stringify(actionResult) });
}

go();