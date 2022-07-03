import { collection, addDoc, getDocs, orderBy, query } from "firebase/firestore";

import { firestore } from "./firebaseConfig";
// import { BrandFetchKey } from "./keys";

/**
 * Get the data about account providers. The data includes the name, website, and logo.
 * 
 * @returns Array with the Account Providers data
 */
export async function getAccountProviders() {
  var accountProviders = [];
  try {
    const q = query(collection(firestore, "brands"), orderBy("name"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      accountProviders.push({
        name: doc.data().name,
        domain: doc.data().domain,
        logos: doc.data().logos
      })
    });
  } catch (error) {
    console.error(error);
  }
  return accountProviders;
}

// /**
//  * TO FILL UP THE ACCOUNT PRORVIDERS DATA
//  */
// var myHeaders = new Headers();
// myHeaders.append("Authorization", "Bearer " + BrandFetchKey);
// myHeaders.append("Content-Type", "application/json");

// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   redirect: 'follow'
// };

// const fetchBrandByURL = () => {
//   //console.log("Length: ", brands.length)
//   brands.forEach(brandURL => {
//     // console.log(brandURL);
//     fetch("https://api.brandfetch.io/v2/brands/" + brandURL, requestOptions)
//       .then(response => response.json())
//       .then(result => saveBrand(result))
//       .catch(error => console.log('error', error));
//   });
// }

// const saveBrand = async brandData => {
//   if (brandData.logos.length > 0) {
//     try {
//       const docRef = await addDoc(collection(firestore, "brands"), brandData);
//       console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//       console.error("Error adding document: ", e);
//     }
//   } else {
//     console.log("Brand without logos");
//   }
// }

// const brands = [
//   "facebook.com",
//   "instagram.com",
//   "tiktok.com",
//   "google.com",
//   "airbnb.com",
//   "aliexpress.com",
//   "amazon.com",
//   "booking.com",
//   "discord.com",
//   "linkedin.com",
//   "live.com",
//   "messenger.com",
//   "samsung.com",
//   "slack.com",
//   "spotify.com",
//   "steampowered.com",
//   "wise.com",
//   "twitter.com",
//   "dailymotion.com",
//   "deezer.com",
//   "dropbox.com",
//   "duolingo.com",
//   "ebay.com",
//   "evernote.com",
//   "flipboard.com",
//   "getpocket.com",
//   "groupon.com",
//   "hootsuite.com",
//   "last.fm",
//   "mailchimp.com",
//   "marvel.com",
//   "nytimes.com",
//   "outlook.com",
//   "paypal.com",
//   "pinterest.com",
//   "runtastic.com",
//   "skype.com",
//   "gmail.com",
//   "soundcloud.com",
//   "trello.com",
//   "tumblr.com",
//   "uber.com",
//   "vimeo.com",
//   "yahoo.com",
//   "anz.co.nz",
//   "kiwibank.co.nz"
// ]
