export const uploadImage = async images => {
  const image_url = [];
  const data = new FormData();
  return new Promise((resolve, reject) => {
      data.append('upload_preset', 'advertspot');
      data.append('cloud_name', 'dwdozndtq');
      var j=0;
      if (images.length > 1) {
      for (let i = 0; i < images.length; i++) {
        j++;
        data.append('file', images[i]);
          fetch('https://api.cloudinary.com/v1_1/dwdozndtq/image/upload', {
              method: 'post',
              body: data
          })
              .then(resp => resp.json())
              .then(data => {
                  console.log('Inside upload');
                  image_url.push(data.url);
                  console.log(data);
                  if(j==images.length-1){
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
