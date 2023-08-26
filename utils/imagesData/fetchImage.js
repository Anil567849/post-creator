



function fetchImage(cb, query, height, width){
    // const url = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${query}&image_type=photo&min_height=${height}&min_width=${width}`;
    const url = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${query}&image_type=photo`;
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
      cb(null, data, query, height, width);
    })
    .catch(error => {
      cb("error", error, query, height, width);
    });
    
}

export default fetchImage;