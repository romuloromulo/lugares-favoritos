const GOOGLE_API_KEY = "AIzaSyCC3--_VjtkDz6cPrV63baB_uOdBavog7o";

export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}

export async function getAddress(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;

  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error("Failed to fetch addres!");
  }
  const data = await resp.json();
  const address = data.results[0].formatted_address;
  console.log(address, "endereço novamente");
  return address;
}
