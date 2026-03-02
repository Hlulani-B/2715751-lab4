

document.addEventListener("DOMContentLoaded", () => {
    const input= document.getElementById("country-input");
    const button= document.getElementById("search-btn");
button.addEventListener('click',async()=>{
    const country_name=input.value;
    
try {
    document.getElementById("loading-spinner").className="spinner";
    const response = await fetch(`https://restcountries.com/v3.1/name/${country_name}`);
const data = await response.json();
const country= data[0];



    
    document.getElementById('country-info').innerHTML = `
    <h2>${country.name.common}</h2>
    <p><strong>Capital:</strong> ${country.capital[0]}</p>
    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
    <p><strong>Region:</strong> ${country.region}</p>
    <img src="${country.flags.svg}" alt="${country.name.common} flag">
`;
if (country.borders && country.borders.length > 0) {
    const neighbors = await Promise.all(
        country.borders.map(async code => {
            const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
            const data = await res.json();
            return data[0]; // the country object
        })
    );

    const bordersSection = document.getElementById("bordering-countries");
    bordersSection.innerHTML = ''; // clear previous

    neighbors.forEach(neighbor => {
        bordersSection.innerHTML += `
            <div class="border-country">
                <h4>${neighbor.name.common}</h4>
                <img src="${neighbor.flags.svg}" alt="${neighbor.name.common} flag" width="100">
            </div>
        `;
    });
} else {
    document.getElementById("bordering-countries").innerHTML = '<p>No bordering countries</p>';
}
     
} catch (error) {
    document.getElementById("error-message").innerHTML=error;
    
}finally{
     document.getElementById("loading-spinner").className="hidden";

}


});
});
