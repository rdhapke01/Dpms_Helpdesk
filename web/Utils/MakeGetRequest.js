export default async function MakeGetRequest(url) {
  let data = null;
  const requestOptions = {
    // method: "GET",
   cache: 'no-store'
  };
  data = await fetch(url, requestOptions)
    .then((response) => response.text())
    .then((data) => JSON.parse(data))
    .catch((error) => {
      console.error(error);
      console.log(`Error in make query for query ${url}`, error.message);
      data = [];
    });
  return data;
}
