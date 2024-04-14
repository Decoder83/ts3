document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('nameInput') as HTMLInputElement;
    const getInfoButton = document.getElementById('getInfoButton');
    const resultDiv = document.getElementById('resultDiv');

    if (!nameInput || !getInfoButton || !resultDiv) {
        console.error("One or more required elements not found.");
        return;
    }

    getInfoButton.addEventListener('click', async () => {
        if (!resultDiv) {
            console.error("Result div not found.");
            return;
        }

        const name = nameInput.value.trim();
        if (!name) {
            alert('Please enter a name.');
            return;
        }

        const nationality = await fetchNationality(name);
        resultDiv.innerHTML = nationality.join(', ');
    });
});

async function fetchNationality(name: string): Promise<string[]> {
    const response = await fetch(`https://api.nationalize.io/?name=${name}`);
    const data = await response.json();
    return data.country.map((country: { country_id: string; probability: number }) => `${country.country_id} (${(country.probability * 100).toFixed(2)}%)`);
}
