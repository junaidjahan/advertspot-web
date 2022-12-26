export const uploadImage = async images => {
  console.log(images);
  const image_url = [];
  const data = new FormData();
  return new Promise((resolve, reject) => {
    data.append('upload_preset', 'advertspot');
    data.append('cloud_name', 'dwdozndtq');
    var j = 0;
    if (images?.length > 1) {
      for (let i = 0; i < images?.length; i++) {
        data.append('file', images[i]);
        fetch('https://api.cloudinary.com/v1_1/dwdozndtq/image/upload', {
          method: 'post',
          body: data
        })
          .then(resp => resp.json())
          .then(data => {
            console.log('Inside upload 2');
            image_url.push(data.url);
            console.log('Images', image_url);
            j++;
            if (j == images?.length) {
              resolve(image_url);
            }
          })
          .catch(err => console.log(err));
      }
    } else {
      data.append('file', images[0]);
      fetch('https://api.cloudinary.com/v1_1/dwdozndtq/image/upload', {
        method: 'post',
        body: data
      })
        .then(resp => resp.json())
        .then(data => {
          console.log('Inside upload');
          image_url.push(data.url);
          console.log(data);
          resolve(image_url);
        })
        .catch(err => console.log(err));
    }
  });
};
