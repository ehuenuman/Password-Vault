import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

import { app } from "./firebaseConfig";
import { BrandFetchKey } from "./keys";
import FireStoreParser from "../app/utils/FirestoreParser";

const db = getFirestore(app);
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + BrandFetchKey);
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

const fetchBrandByURL = () => {
  //console.log("Length: ", brands.length)
  brands.forEach(brandURL => {
    console.log(brandURL);
    fetch("https://api.brandfetch.io/v2/brands/" + brandURL, requestOptions)
      .then(response => response.json())
      .then(result => storeBrand(result))
      .catch(error => console.log('error', error));
  });
}

async function storeBrand(brandData) {
  // console.log(typeof (brandData), JSON.stringify(brandData));
  if (brandData.logos.length > 0) {
    const brand = {
      name: brandData.name,
      domain: brandData.domain,
      colors: brandData.colors,
      logos: brandData.logos
    }
    try {
      const docRef = await addDoc(collection(db, "Brands"), brandData);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } else {
    console.log("Brand without logos");
  }
}

export default async function getAllBrands() {
  // console.log("Fetching brands");
  var brands = [];
  const querySnapshot = await getDocs(collection(db, "Brands"));
  querySnapshot.forEach((doc) => {
    brands.push({
      name: doc.data().name,
      domain: doc.data().domain,
      logos: doc.data().logos
    })
  });
  return brands;
}

const brands = [
  "facebook.com",
  "instagram.com",
  "tiktok.com",
  "google.com",
  "airbnb.com",
  "aliexpress.com",
  "amazon.com",
  "booking.com",
  "discord.com",
  "linkedin.com",
  "live.com",
  "messenger.com",
  "samsung.com",
  "slack.com",
  "spotify.com",
  "steampowered.com",
  "wise.com",
  "twitter.com",
  "dailymotion.com",
  "deezer.com",
  "dropbox.com",
  "duolingo.com",
  "ebay.com",
  "evernote.com",
  "flipboard.com",
  "getpocket.com",
  "groupon.com",
  "hootsuite.com",
  "last.fm",
  "mailchimp.com",
  "marvel.com",
  "nytimes.com",
  "outlook.com",
  "paypal.com",
  "pinterest.com",
  "runtastic.com",
  "skype.com",
  "gmail.com",
  "soundcloud.com",
  "trello.com",
  "tumblr.com",
  "uber.com",
  "vimeo.com",
  "yahoo.com",
  "anz.co.nz",
  "kiwibank.co.nz"
]
