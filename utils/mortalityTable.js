export const mortalityTable = [
    { age: 20, deaths: 0.00052 },
    { age: 21, deaths: 0.00044 },
    { age: 22, deaths: 0.00042 },
    { age: 23, deaths: 0.00036 },
    { age: 24, deaths: 0.0003 },
    { age: 25, deaths: 0.00026 },
    { age: 26, deaths: 0.00023 },
    { age: 27, deaths: 0.0002 },
    { age: 28, deaths: 0.00017 },
    { age: 29, deaths: 0.00016 },
    { age: 30, deaths: 0.00015 },
    { age: 31, deaths: 0.00013 },
    { age: 32, deaths: 0.00013 },
    { age: 33, deaths: 0.00013 },
    { age: 34, deaths: 0.00014 },
    { age: 35, deaths: 0.00014 },
    { age: 36, deaths: 0.00014 },
    { age: 37, deaths: 0.00014 },
    { age: 38, deaths: 0.00014 },
    { age: 39, deaths: 0.00014 },
    { age: 40, deaths: 0.00015 },
    { age: 41, deaths: 0.00017 },
    { age: 42, deaths: 0.0002 },
    { age: 43, deaths: 0.00023 },
    { age: 44, deaths: 0.00027 },
    { age: 45, deaths: 0.00031 },
    { age: 46, deaths: 0.00035 },
    { age: 47, deaths: 0.00039 },
    { age: 48, deaths: 0.00042 },
    { age: 49, deaths: 0.00044 },
    { age: 50, deaths: 0.00045 }
];

// a retun of -1 means non-existent entry for provided age
export function getQx(age) {
    const record = mortalityTable.find(entry => entry.age == age);
    return record ? record.deaths : -1;
}

const age = 45;  // Input age
// const qx = getQx(age);

// console.log(`For age ${age}, the qx value is ${qx}`);
