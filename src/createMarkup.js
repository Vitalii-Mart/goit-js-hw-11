function createMarkup(array) {
  const markup = array
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
   <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}"  loading="lazy"/></a>
  <div class="info">
    <p class="info-item">
      Likes
      <span class="info-item__span">${likes}</span>
    </p>
    <p class="info-item">
      Views
      <span class="info-item__span">${views}</span>
      
    </p>
    <p class="info-item">
      Comments
      <span class="info-item__span">${comments}</span>
      
    </p>
    <p class="info-item">
      Downloads
      <span class="info-item__span">${downloads}</span>
      
    </p>
  </div>
</div>`
    )
    .join('');

return markup;
}

export { createMarkup };
