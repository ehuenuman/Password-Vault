var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer wHWEIMsauYfOq3uDMu/LYwQGv6mh5RA8ZN4ulYFH1DM=");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

export const fetchBrandByName = (brandName) => {
  fetch("https://api.brandfetch.io/v2/brands/" + brandName, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}