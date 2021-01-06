global.navigator.geolocation = {
  getCurrentPosition: jest.fn(),
}

global.navigator.permissions = {
  query: jest.fn(),
}
