
//  data = sum_assured_data[start, port_size]
function stdevP(data) {
    const mean = data.reduce((sum, value) => sum + value, 0) / data.length;

    const squaredDiffs = data.map(value => Math.pow(value - mean, 2));

    const avgSquaredDiff = squaredDiffs.reduce((sum, value) => sum + value, 0) / data.length;

    return Math.round(Math.sqrt(avgSquaredDiff));
}

const data = [400000, 291000, 289000, 459000, 285000];
const result = stdevP(data);

console.log("Standard Deviation (Population):", result);
