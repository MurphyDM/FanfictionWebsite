import axios from "axios";
import { getJwt } from "../helpers/getJwt";

export function uploadImage(url, file, storyId) {
  let reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = (e) => {
    const image = e.target.result;

    axios.post(
        url,
        {
          image: image,
          name: file.name,
          story: storyId,
        },
        {
          headers: {
            Authorization: getJwt(),
          },
        }
      )
      .then((res) => {
        console.log("img was uploaded to the server successfully");
      })
      .catch(() => alert('can"t upload image file right now'));
  };
}
