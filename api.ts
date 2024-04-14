export async function fetchNationality(name: string): Promise<string[]> {
    const response = await fetch(`https://api.nationalize.io/?name=${name}`);
    const data = await response.json();
    return data.country.map((country: any) => country.country_id);
}
