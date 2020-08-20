class Offer {
  parse(data) {
    return {
      city: {
        name: data[`city`][`name`],
        location: {
          latitude: data[`city`][`location`][`latitude`],
          longitude: data[`city`][`location`][`longitude`],
          zoom: data[`city`][`location`][`zoom`],
        },
      },
      previewImage: data[`preview_image`],
      images: data[`images`],
      title: data[`title`],
      isFavorite: data[`is_favorite`],
      isPremium: data[`is_premium`],
      rating: data[`rating`],
      type: data[`type`],
      bedrooms: data[`bedrooms`],
      maxAdults: data[`max_adults`],
      price: data[`price`],
      goods: data[`goods`],
      host: {
        id: data[`host`][`id`],
        name: data[`host`][`name`],
        isPro: data[`host`][`is_pro`],
        avatarUrl: data[`host`][`avatar_url`],
      },
      description: data[`description`],
      location: {
        latitude: data[`location`][`latitude`],
        longitude: data[`location`][`longitude`],
        zoom: data[`location`][`zoom`],
      },
      id: data[`id`],
    };
  }

  toRAW(data) {
    return {
      "city": {
        "name": data.city.name,
        "location": {
          "latitude": data.city.location.latitude,
          "longitude": data.city.location.longitude,
          "zoom": data.city.location.zoom,
        },
      },
      "preview_image": data.previewImage,
      "images": data.images,
      "title": data.title,
      "is_favorite": data.isFavorite,
      "is_premium": data.isPremium,
      "rating": data.rating,
      "type": data.type,
      "bedrooms": data.bedrooms,
      "max_adults": data.maxAdults,
      "price": data.price,
      "goods": data.goods,
      "host": {
        "id": data.host.id,
        "name": data.host.name,
        "is_pro": data.host.isPro,
        "avatar_url": data.host.avatarUrl,
      },
      "description": data.description,
      "location": {
        "latitude": data.location.latitude,
        "longitude": data.location.longitude,
        "zoom": data.location.zoom,
      },
      "id": data.id,
    };
  }
}

export default Offer;
