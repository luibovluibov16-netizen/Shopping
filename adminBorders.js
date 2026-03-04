// Код для получения географических границ местности (полигона) через OpenStreetMap Nominatim API.
async function loadAreaGeoJSON(searchQuery) {
  try {
    const url =
      'https://nominatim.openstreetmap.org/search?' +
      new URLSearchParams({
        format: 'json',
        q: searchQuery,
        polygon_geojson: 1,
        limit: 1,
        polygon_threshold: 0.005,
      });

    console.log('Запрос к Nominatim:', url);

    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'YourAppName/1.0 (your-email@example.com)',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log('Ответ от Nominatim:', data);

    if (!data.length) {
      throw new Error('Местоположение не найдено');
    }

    const result = data[0];

    if (!result.geojson) {
      throw new Error('GeoJSON не найден в ответе');
    }

    console.log('Тип геометрии:', result.geojson.type);
    console.log('Координаты получены');

    return result.geojson;
  } catch (error) {
    console.error('Ошибка в loadAreaGeoJSON:', error);
    throw error;
  }
}

// Делаем функцию глобальной
window.loadAreaGeoJSON = loadAreaGeoJSON;
