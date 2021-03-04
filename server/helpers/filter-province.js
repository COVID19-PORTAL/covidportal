function filter(province, covids, hospitals){
    const filterCovid = covids.filter(covid => covid.provinsi.toLowerCase() === province.toLowerCase());
    const filterHospitals = hospitals.filter(hospital => hospital.province.toLowerCase() === province.toLowerCase());
    return {filterCovid, filterHospitals} 
}

module.exports = filter