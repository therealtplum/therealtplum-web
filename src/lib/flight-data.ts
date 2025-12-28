// Airport coordinates (latitude, longitude)
export const airportCoordinates: Record<string, { lat: number; lng: number; name: string; country: string }> = {
  // US Airports
  MCI: { lat: 39.2976, lng: -94.7139, name: "Kansas City", country: "US" },
  ORD: { lat: 41.9742, lng: -87.9073, name: "Chicago O'Hare", country: "US" },
  ICT: { lat: 37.6499, lng: -97.4331, name: "Wichita", country: "US" },
  DEN: { lat: 39.8561, lng: -104.6737, name: "Denver", country: "US" },
  SAT: { lat: 29.5337, lng: -98.4698, name: "San Antonio", country: "US" },
  BOS: { lat: 42.3656, lng: -71.0096, name: "Boston", country: "US" },
  LGA: { lat: 40.7769, lng: -73.8740, name: "New York LaGuardia", country: "US" },
  FLL: { lat: 26.0726, lng: -80.1527, name: "Fort Lauderdale", country: "US" },
  LAX: { lat: 33.9425, lng: -118.4081, name: "Los Angeles", country: "US" },
  SFO: { lat: 37.6213, lng: -122.3790, name: "San Francisco", country: "US" },
  OGG: { lat: 20.8986, lng: -156.4305, name: "Maui", country: "US" },
  HNL: { lat: 21.3245, lng: -157.9251, name: "Honolulu", country: "US" },
  AUS: { lat: 30.1975, lng: -97.6664, name: "Austin", country: "US" },
  IAH: { lat: 29.9902, lng: -95.3368, name: "Houston", country: "US" },
  MIA: { lat: 25.7959, lng: -80.2870, name: "Miami", country: "US" },
  RSW: { lat: 26.5362, lng: -81.7552, name: "Fort Myers", country: "US" },
  IAD: { lat: 38.9531, lng: -77.4565, name: "Washington Dulles", country: "US" },
  DCA: { lat: 38.8521, lng: -77.0377, name: "Washington Reagan", country: "US" },
  BNA: { lat: 36.1263, lng: -86.6774, name: "Nashville", country: "US" },
  PHL: { lat: 39.8744, lng: -75.2424, name: "Philadelphia", country: "US" },
  SAN: { lat: 32.7336, lng: -117.1897, name: "San Diego", country: "US" },
  PHX: { lat: 33.4373, lng: -112.0078, name: "Phoenix", country: "US" },
  SEA: { lat: 47.4502, lng: -122.3088, name: "Seattle", country: "US" },
  CVG: { lat: 39.0488, lng: -84.6678, name: "Cincinnati", country: "US" },
  ATL: { lat: 33.6407, lng: -84.4277, name: "Atlanta", country: "US" },
  DFW: { lat: 32.8998, lng: -97.0403, name: "Dallas/Fort Worth", country: "US" },
  DAL: { lat: 32.8471, lng: -96.8518, name: "Dallas Love Field", country: "US" },
  MSY: { lat: 29.9934, lng: -90.2580, name: "New Orleans", country: "US" },
  RNO: { lat: 39.4991, lng: -119.7681, name: "Reno", country: "US" },
  LAS: { lat: 36.0840, lng: -115.1537, name: "Las Vegas", country: "US" },
  AVL: { lat: 35.4362, lng: -82.5418, name: "Asheville", country: "US" },
  JFK: { lat: 40.6413, lng: -73.7781, name: "New York JFK", country: "US" },
  PBI: { lat: 26.6832, lng: -80.0956, name: "West Palm Beach", country: "US" },
  ABQ: { lat: 35.0402, lng: -106.6090, name: "Albuquerque", country: "US" },
  SLC: { lat: 40.7899, lng: -111.9791, name: "Salt Lake City", country: "US" },
  RDM: { lat: 44.2541, lng: -121.1500, name: "Redmond", country: "US" },
  MDW: { lat: 41.7868, lng: -87.7522, name: "Chicago Midway", country: "US" },
  
  // International Airports
  CUN: { lat: 21.0365, lng: -86.8771, name: "Cancún", country: "MX" },
  LHR: { lat: 51.4700, lng: -0.4543, name: "London Heathrow", country: "GB" },
  LCY: { lat: 51.5053, lng: 0.0553, name: "London City", country: "GB" },
  TXL: { lat: 52.5597, lng: 13.2877, name: "Berlin Tegel", country: "DE" },
  LIS: { lat: 38.7756, lng: -9.1354, name: "Lisbon", country: "PT" },
  AMS: { lat: 52.3105, lng: 4.7683, name: "Amsterdam", country: "NL" },
  GRU: { lat: -23.4356, lng: -46.4731, name: "São Paulo", country: "BR" },
  CGH: { lat: -23.6273, lng: -46.6566, name: "São Paulo Congonhas", country: "BR" },
  SDU: { lat: -22.9105, lng: -43.1631, name: "Rio de Janeiro Santos Dumont", country: "BR" },
  GIG: { lat: -22.8099, lng: -43.2506, name: "Rio de Janeiro", country: "BR" },
  SCL: { lat: -33.3930, lng: -70.7858, name: "Santiago", country: "CL" },
  MEX: { lat: 19.4363, lng: -99.0721, name: "Mexico City", country: "MX" },
  PVR: { lat: 20.6801, lng: -105.2544, name: "Puerto Vallarta", country: "MX" },
  PVG: { lat: 31.1443, lng: 121.8083, name: "Shanghai", country: "CN" },
  HKG: { lat: 22.3080, lng: 113.9185, name: "Hong Kong", country: "HK" },
  SIN: { lat: 1.3644, lng: 103.9915, name: "Singapore", country: "SG" },
  SXM: { lat: 18.0410, lng: -63.1089, name: "St. Maarten", country: "SX" },
  UVF: { lat: 13.7332, lng: -60.9526, name: "St. Lucia", country: "LC" },
  BUD: { lat: 47.4298, lng: 19.2611, name: "Budapest", country: "HU" },
  FLN: { lat: -27.6704, lng: -48.5525, name: "Florianópolis", country: "BR" },
  AEP: { lat: -34.5592, lng: -58.4156, name: "Buenos Aires", country: "AR" },
  HND: { lat: 35.5494, lng: 139.7798, name: "Tokyo Haneda", country: "JP" },
};

// Parse the flight data from CSV
export interface Flight {
  date: string;
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  aircraft: string;
  canceled: boolean;
}

export interface Route {
  from: string;
  to: string;
  count: number;
  flights: Flight[];
}

export interface AirportStats {
  code: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  visitCount: number;
}

// Pre-parsed flight data from the CSV
export const flights: Flight[] = [
  { date: "2015-06-06", airline: "UAL", flightNumber: "5494", from: "MCI", to: "ORD", aircraft: "Embraer 175", canceled: false },
  { date: "2015-06-09", airline: "UAL", flightNumber: "5911", from: "ORD", to: "MCI", aircraft: "Embraer RJ145", canceled: false },
  { date: "2015-07-30", airline: "UAL", flightNumber: "5491", from: "MCI", to: "ORD", aircraft: "Embraer 175", canceled: false },
  { date: "2016-01-02", airline: "UAL", flightNumber: "5947", from: "ICT", to: "ORD", aircraft: "Embraer RJ145", canceled: false },
  { date: "2016-04-22", airline: "UAL", flightNumber: "4039", from: "ORD", to: "MCI", aircraft: "Embraer RJ145", canceled: false },
  { date: "2016-04-24", airline: "UAL", flightNumber: "3905", from: "MCI", to: "ORD", aircraft: "Embraer RJ145", canceled: false },
  { date: "2016-05-12", airline: "AAL", flightNumber: "1153", from: "ORD", to: "DEN", aircraft: "McDonnell Douglas MD-82", canceled: false },
  { date: "2016-05-15", airline: "AAL", flightNumber: "2312", from: "DEN", to: "ORD", aircraft: "McDonnell Douglas MD-82", canceled: false },
  { date: "2016-05-26", airline: "UAL", flightNumber: "350", from: "ORD", to: "SAT", aircraft: "Boeing 737-700", canceled: false },
  { date: "2016-05-30", airline: "UAL", flightNumber: "6001", from: "SAT", to: "ORD", aircraft: "Bombardier CRJ700", canceled: false },
  { date: "2016-09-01", airline: "UAL", flightNumber: "4309", from: "ORD", to: "ICT", aircraft: "Embraer RJ145", canceled: false },
  { date: "2016-09-05", airline: "UAL", flightNumber: "4378", from: "ICT", to: "ORD", aircraft: "Embraer RJ145", canceled: false },
  { date: "2017-10-04", airline: "UAL", flightNumber: "446", from: "ORD", to: "MCI", aircraft: "Boeing 737-800", canceled: false },
  { date: "2017-10-08", airline: "UAL", flightNumber: "1588", from: "MCI", to: "ORD", aircraft: "Boeing 737-900ER", canceled: false },
  { date: "2017-10-27", airline: "UAL", flightNumber: "1198", from: "ORD", to: "CUN", aircraft: "Boeing 737-900ER", canceled: false },
  { date: "2017-10-31", airline: "UAL", flightNumber: "1196", from: "CUN", to: "ORD", aircraft: "Boeing 737-900ER", canceled: false },
  { date: "2017-11-19", airline: "UAL", flightNumber: "4015", from: "ORD", to: "ICT", aircraft: "Embraer RJ145", canceled: false },
  { date: "2017-11-25", airline: "UAL", flightNumber: "5626", from: "ICT", to: "ORD", aircraft: "Bombardier CRJ200", canceled: false },
  { date: "2018-10-10", airline: "UAL", flightNumber: "1270", from: "ORD", to: "MCI", aircraft: "Airbus A320", canceled: false },
  { date: "2018-12-22", airline: "UAL", flightNumber: "4261", from: "ORD", to: "ICT", aircraft: "Embraer RJ145", canceled: false },
  { date: "2018-12-30", airline: "UAL", flightNumber: "5556", from: "ICT", to: "ORD", aircraft: "Bombardier CRJ200", canceled: false },
  { date: "2019-02-08", airline: "AAL", flightNumber: "2723", from: "ORD", to: "BOS", aircraft: "Boeing 737-800", canceled: false },
  { date: "2019-02-10", airline: "AAL", flightNumber: "259", from: "BOS", to: "ORD", aircraft: "Boeing 737-800", canceled: false },
  { date: "2019-03-08", airline: "UAL", flightNumber: "1498", from: "ORD", to: "MCI", aircraft: "Airbus A320", canceled: false },
  { date: "2019-03-10", airline: "UAL", flightNumber: "4030", from: "MCI", to: "ORD", aircraft: "Embraer RJ145", canceled: false },
  { date: "2019-04-01", airline: "AAL", flightNumber: "2486", from: "ORD", to: "LGA", aircraft: "Boeing 737-800", canceled: false },
  { date: "2019-05-07", airline: "UAL", flightNumber: "2072", from: "ORD", to: "FLL", aircraft: "Boeing 737-900ER", canceled: false },
  { date: "2019-05-13", airline: "UAL", flightNumber: "2386", from: "FLL", to: "ORD", aircraft: "Boeing 737-800", canceled: false },
  { date: "2019-06-07", airline: "UAL", flightNumber: "4079", from: "ORD", to: "ICT", aircraft: "Embraer RJ145", canceled: false },
  { date: "2019-06-09", airline: "UAL", flightNumber: "4062", from: "ICT", to: "ORD", aircraft: "Embraer RJ145", canceled: false },
  { date: "2019-07-03", airline: "UAL", flightNumber: "3913", from: "ORD", to: "ICT", aircraft: "Bombardier CRJ200", canceled: false },
  { date: "2019-07-07", airline: "UAL", flightNumber: "4062", from: "ICT", to: "ORD", aircraft: "Embraer RJ145", canceled: false },
  { date: "2019-08-30", airline: "UAL", flightNumber: "5741", from: "ORD", to: "SAT", aircraft: "Embraer 175", canceled: false },
  { date: "2019-09-06", airline: "AAL", flightNumber: "6196", from: "ORD", to: "LHR", aircraft: "Airbus A380-800", canceled: false },
  { date: "2019-09-15", airline: "AAL", flightNumber: "47", from: "LHR", to: "ORD", aircraft: "Boeing 787-9", canceled: false },
  { date: "2019-11-20", airline: "UAL", flightNumber: "1736", from: "DEN", to: "OGG", aircraft: "Boeing 777-200 ER", canceled: false },
  { date: "2019-11-20", airline: "UAL", flightNumber: "3581", from: "ICT", to: "DEN", aircraft: "Embraer 170", canceled: false },
  { date: "2019-11-20", airline: "UAL", flightNumber: "566", from: "ORD", to: "LAX", aircraft: "Boeing 757-300", canceled: false },
  { date: "2019-11-20", airline: "UAL", flightNumber: "744", from: "DEN", to: "LAX", aircraft: "Boeing 737-800", canceled: false },
  { date: "2019-11-20", airline: "UAL", flightNumber: "454", from: "LAX", to: "OGG", aircraft: "Boeing 737-800", canceled: false },
  { date: "2019-11-27", airline: "UAL", flightNumber: "995", from: "SFO", to: "ORD", aircraft: "Boeing 777-200 ER", canceled: false },
  { date: "2019-11-28", airline: "UAL", flightNumber: "7859", from: "OGG", to: "HNL", aircraft: "Boeing 717-200", canceled: false },
  { date: "2019-11-28", airline: "UAL", flightNumber: "1722", from: "OGG", to: "SFO", aircraft: "Boeing 777-200 ER", canceled: false },
  { date: "2019-11-28", airline: "UAL", flightNumber: "383", from: "HNL", to: "DEN", aircraft: "Boeing 777-200 ER", canceled: false },
  { date: "2019-11-28", airline: "UAL", flightNumber: "1557", from: "OGG", to: "SFO", aircraft: "Boeing 737-800", canceled: false },
  { date: "2019-11-29", airline: "UAL", flightNumber: "431", from: "SFO", to: "DEN", aircraft: "Boeing 737-900ER", canceled: false },
  { date: "2019-11-29", airline: "UAL", flightNumber: "4686", from: "DEN", to: "ICT", aircraft: "Embraer EMB-145XR", canceled: true },
  { date: "2019-12-23", airline: "AAL", flightNumber: "3765", from: "ORD", to: "ICT", aircraft: "Embraer RJ145", canceled: false },
  { date: "2019-12-29", airline: "AAL", flightNumber: "3758", from: "ICT", to: "ORD", aircraft: "Embraer RJ145", canceled: false },
  { date: "2020-01-03", airline: "UAL", flightNumber: "938", from: "ORD", to: "LHR", aircraft: "Boeing 767-300", canceled: false },
  { date: "2020-01-10", airline: "BAW", flightNumber: "8495", from: "LCY", to: "TXL", aircraft: "Embraer 190", canceled: false },
  { date: "2020-01-12", airline: "BAW", flightNumber: "8492", from: "TXL", to: "LCY", aircraft: "Embraer 190", canceled: false },
  { date: "2020-01-17", airline: "TAP", flightNumber: "1367", from: "LHR", to: "LIS", aircraft: "Airbus A319", canceled: false },
  { date: "2020-01-19", airline: "TAP", flightNumber: "1356", from: "LIS", to: "LHR", aircraft: "Airbus A321neo", canceled: false },
  { date: "2020-01-20", airline: "UAL", flightNumber: "928", from: "LHR", to: "ORD", aircraft: "Boeing 767-300", canceled: false },
  { date: "2020-01-31", airline: "AAL", flightNumber: "3037", from: "ORD", to: "MCI", aircraft: "Bombardier CRJ700", canceled: false },
  { date: "2020-02-02", airline: "UAL", flightNumber: "3706", from: "MCI", to: "ORD", aircraft: "Embraer 175", canceled: false },
  { date: "2020-04-12", airline: "UAL", flightNumber: "1505", from: "DEN", to: "ORD", aircraft: "Boeing 757-300", canceled: false },
  { date: "2020-05-01", airline: "AAL", flightNumber: "1629", from: "ORD", to: "AUS", aircraft: "Boeing 737-800", canceled: false },
  { date: "2020-06-12", airline: "UAL", flightNumber: "5268", from: "ORD", to: "ICT", aircraft: "Embraer 175", canceled: false },
  { date: "2020-06-15", airline: "UAL", flightNumber: "5438", from: "ICT", to: "ORD", aircraft: "Embraer 175", canceled: false },
  { date: "2020-07-01", airline: "UAL", flightNumber: "571", from: "ORD", to: "DEN", aircraft: "Airbus A320", canceled: false },
  { date: "2020-07-05", airline: "UAL", flightNumber: "1180", from: "DEN", to: "ORD", aircraft: "Boeing 777-200 ER", canceled: false },
  { date: "2020-09-03", airline: "AAL", flightNumber: "3247", from: "ORD", to: "MCI", aircraft: "Bombardier CRJ700", canceled: false },
  { date: "2020-09-07", airline: "AAL", flightNumber: "4246", from: "MCI", to: "ORD", aircraft: "Embraer 175", canceled: false },
  { date: "2020-09-29", airline: "UAL", flightNumber: "3435", from: "ORD", to: "AUS", aircraft: "Embraer 175", canceled: false },
  { date: "2020-10-05", airline: "UAL", flightNumber: "3611", from: "AUS", to: "ORD", aircraft: "Embraer 170", canceled: false },
  { date: "2020-11-24", airline: "UAL", flightNumber: "1564", from: "ORD", to: "DEN", aircraft: "Boeing 737-800", canceled: false },
  { date: "2020-11-29", airline: "UAL", flightNumber: "2385", from: "DEN", to: "ORD", aircraft: "Boeing 757-300", canceled: false },
  { date: "2020-12-18", airline: "UAL", flightNumber: "3467", from: "ORD", to: "ICT", aircraft: "Embraer 170", canceled: false },
  { date: "2021-02-13", airline: "UAL", flightNumber: "500", from: "DEN", to: "ORD", aircraft: "Boeing 757-300", canceled: false },
  { date: "2021-02-14", airline: "UAL", flightNumber: "1026", from: "DEN", to: "AUS", aircraft: "Boeing 737-800", canceled: false },
  { date: "2021-02-20", airline: "UAL", flightNumber: "1267", from: "ORD", to: "MIA", aircraft: "Boeing 737-900ER", canceled: false },
  { date: "2021-03-08", airline: "AAL", flightNumber: "565", from: "MIA", to: "AUS", aircraft: "Boeing 737-800", canceled: false },
  { date: "2021-03-09", airline: "AAL", flightNumber: "565", from: "MIA", to: "AUS", aircraft: "Boeing 737-800", canceled: false },
  { date: "2021-04-02", airline: "UAL", flightNumber: "4754", from: "AUS", to: "IAH", aircraft: "Embraer 175", canceled: false },
  { date: "2021-04-02", airline: "UAL", flightNumber: "6181", from: "IAH", to: "ICT", aircraft: "Embraer 175", canceled: false },
  { date: "2021-04-10", airline: "UAL", flightNumber: "3465", from: "ICT", to: "ORD", aircraft: "Embraer 175", canceled: false },
  { date: "2021-07-21", airline: "UAL", flightNumber: "644", from: "AUS", to: "DEN", aircraft: "Boeing 737 MAX 9", canceled: false },
  { date: "2021-07-24", airline: "UAL", flightNumber: "366", from: "DEN", to: "AUS", aircraft: "Boeing 737-900ER", canceled: false },
  { date: "2021-07-25", airline: "UAL", flightNumber: "2470", from: "RNO", to: "DEN", aircraft: "Airbus A319", canceled: false },
  { date: "2021-07-25", airline: "UAL", flightNumber: "366", from: "DEN", to: "AUS", aircraft: "Boeing 737 MAX 9", canceled: false },
  { date: "2021-07-29", airline: "UAL", flightNumber: "3442", from: "AUS", to: "ORD", aircraft: "Embraer 170", canceled: false },
  { date: "2021-08-02", airline: "UAL", flightNumber: "1424", from: "ORD", to: "AUS", aircraft: "Boeing 737-800", canceled: false },
  { date: "2021-09-30", airline: "UAL", flightNumber: "644", from: "AUS", to: "DEN", aircraft: "Boeing 737-900ER", canceled: false },
  { date: "2021-10-04", airline: "UAL", flightNumber: "329", from: "DEN", to: "AUS", aircraft: "Boeing 737-900ER", canceled: false },
  { date: "2021-11-19", airline: "UAL", flightNumber: "245", from: "AUS", to: "IAH", aircraft: "Boeing 737-800", canceled: false },
  { date: "2021-11-19", airline: "UAL", flightNumber: "4822", from: "IAH", to: "ICT", aircraft: "Embraer RJ145", canceled: false },
  { date: "2022-03-14", airline: "UAL", flightNumber: "630", from: "AUS", to: "IAH", aircraft: "Boeing 737-800", canceled: false },
  { date: "2022-03-14", airline: "UAL", flightNumber: "2100", from: "IAH", to: "FLL", aircraft: "Boeing 737 MAX 8", canceled: false },
  { date: "2022-03-18", airline: "UAL", flightNumber: "1588", from: "FLL", to: "ORD", aircraft: "Boeing 737-900ER", canceled: false },
  { date: "2022-03-20", airline: "UAL", flightNumber: "2677", from: "ORD", to: "IAD", aircraft: "Boeing 737 MAX 9", canceled: false },
  { date: "2022-03-20", airline: "UAL", flightNumber: "946", from: "IAD", to: "AMS", aircraft: "Boeing 767-300", canceled: false },
  { date: "2022-03-27", airline: "BAW", flightNumber: "8456", from: "AMS", to: "LCY", aircraft: "Embraer 190", canceled: false },
  { date: "2022-04-03", airline: "UAL", flightNumber: "879", from: "LHR", to: "IAH", aircraft: "Boeing 787-9", canceled: false },
  { date: "2022-04-03", airline: "UAL", flightNumber: "1186", from: "IAH", to: "AUS", aircraft: "Airbus A319", canceled: false },
  { date: "2022-04-09", airline: "UAL", flightNumber: "231", from: "AUS", to: "IAH", aircraft: "Boeing 737-800", canceled: false },
  { date: "2022-04-09", airline: "UAL", flightNumber: "4245", from: "IAH", to: "ICT", aircraft: "Embraer RJ145", canceled: false },
  { date: "2022-04-18", airline: "UAL", flightNumber: "5223", from: "ICT", to: "ORD", aircraft: "Bombardier CRJ200", canceled: false },
  { date: "2022-04-24", airline: "UAL", flightNumber: "2651", from: "ORD", to: "AUS", aircraft: "Boeing 737-800", canceled: false },
  { date: "2022-05-06", airline: "AAL", flightNumber: "3978", from: "AUS", to: "MCI", aircraft: "Embraer 175", canceled: false },
  { date: "2022-05-07", airline: "AAL", flightNumber: "1617", from: "MCI", to: "DFW", aircraft: "Airbus A320", canceled: false },
  { date: "2022-05-11", airline: "DAL", flightNumber: "2078", from: "AUS", to: "ATL", aircraft: "Airbus A321", canceled: false },
  { date: "2022-05-11", airline: "DAL", flightNumber: "999", from: "ATL", to: "RSW", aircraft: "Boeing 757-200", canceled: false },
  { date: "2022-05-15", airline: "DAL", flightNumber: "2914", from: "RSW", to: "ATL", aircraft: "Boeing 757-200", canceled: false },
  { date: "2022-05-15", airline: "DAL", flightNumber: "346", from: "ATL", to: "AUS", aircraft: "Airbus A321", canceled: false },
  { date: "2022-06-20", airline: "UAL", flightNumber: "288", from: "AUS", to: "ORD", aircraft: "Airbus A320", canceled: false },
  { date: "2022-06-21", airline: "UAL", flightNumber: "1424", from: "ORD", to: "AUS", aircraft: "Airbus A319", canceled: false },
  { date: "2022-07-06", airline: "UAL", flightNumber: "329", from: "AUS", to: "ORD", aircraft: "Airbus A320", canceled: false },
  { date: "2022-07-09", airline: "UAL", flightNumber: "2440", from: "ORD", to: "AUS", aircraft: "Airbus A319", canceled: false },
  { date: "2022-07-12", airline: "UAL", flightNumber: "329", from: "AUS", to: "ORD", aircraft: "Airbus A320", canceled: false },
  { date: "2022-07-17", airline: "UAL", flightNumber: "2684", from: "ORD", to: "DEN", aircraft: "Boeing 737-900ER", canceled: false },
  { date: "2022-07-25", airline: "UAL", flightNumber: "2377", from: "DEN", to: "AUS", aircraft: "Airbus A320", canceled: false },
  { date: "2022-07-29", airline: "UAL", flightNumber: "329", from: "AUS", to: "ORD", aircraft: "Airbus A320", canceled: false },
  { date: "2022-07-31", airline: "UAL", flightNumber: "2440", from: "ORD", to: "AUS", aircraft: "Airbus A319", canceled: false },
  { date: "2022-08-19", airline: "SWA", flightNumber: "2842", from: "AUS", to: "DAL", aircraft: "Boeing 737-800", canceled: false },
  { date: "2022-08-19", airline: "SWA", flightNumber: "761", from: "DAL", to: "MCI", aircraft: "Boeing 737-800", canceled: false },
  { date: "2022-08-21", airline: "SWA", flightNumber: "409", from: "MCI", to: "MSY", aircraft: "Boeing 737-800", canceled: false },
  { date: "2022-08-21", airline: "SWA", flightNumber: "644", from: "MSY", to: "AUS", aircraft: "Boeing 737-700", canceled: false },
  { date: "2022-08-24", airline: "UAL", flightNumber: "2198", from: "AUS", to: "ORD", aircraft: "Airbus A320", canceled: false },
  { date: "2022-08-25", airline: "UAL", flightNumber: "1424", from: "ORD", to: "AUS", aircraft: "Airbus A320", canceled: false },
  { date: "2022-09-02", airline: "UAL", flightNumber: "255", from: "AUS", to: "IAH", aircraft: "Boeing 737-900ER", canceled: false },
  { date: "2022-09-02", airline: "UAL", flightNumber: "1028", from: "IAH", to: "MEX", aircraft: "Airbus A319", canceled: false },
  { date: "2022-09-05", airline: "UAL", flightNumber: "1089", from: "MEX", to: "IAH", aircraft: "Boeing 737-700", canceled: false },
  { date: "2022-09-05", airline: "UAL", flightNumber: "6034", from: "IAH", to: "AUS", aircraft: "Embraer 175", canceled: false },
  { date: "2022-09-10", airline: "UAL", flightNumber: "255", from: "AUS", to: "IAH", aircraft: "Boeing 737-800", canceled: false },
  { date: "2022-09-10", airline: "UAL", flightNumber: "62", from: "IAH", to: "GRU", aircraft: "Boeing 787-9", canceled: false },
  { date: "2022-09-16", airline: "LAN", flightNumber: "3918", from: "CGH", to: "SDU", aircraft: "Airbus A320", canceled: false },
  { date: "2022-09-19", airline: "LAN", flightNumber: "771", from: "GIG", to: "SCL", aircraft: "Airbus A321", canceled: false },
  { date: "2022-09-24", airline: "UAL", flightNumber: "846", from: "SCL", to: "IAH", aircraft: "Boeing 767-300", canceled: false },
  { date: "2022-09-25", airline: "UAL", flightNumber: "1952", from: "IAH", to: "AUS", aircraft: "Boeing 737-800", canceled: false },
  { date: "2022-10-08", airline: "UAL", flightNumber: "288", from: "AUS", to: "ORD", aircraft: "Airbus A320", canceled: false },
  { date: "2022-10-12", airline: "AAL", flightNumber: "3309", from: "ORD", to: "AUS", aircraft: "Embraer 175", canceled: false },
  { date: "2022-11-11", airline: "UAL", flightNumber: "231", from: "AUS", to: "IAH", aircraft: "Boeing 737-900ER", canceled: false },
  { date: "2022-11-11", airline: "UAL", flightNumber: "1693", from: "IAH", to: "RSW", aircraft: "Boeing 737-700", canceled: false },
  { date: "2022-11-13", airline: "UAL", flightNumber: "1485", from: "RSW", to: "ORD", aircraft: "Boeing 737-800", canceled: false },
  { date: "2022-11-20", airline: "UAL", flightNumber: "2440", from: "ORD", to: "AUS", aircraft: "Boeing 737 MAX 9", canceled: false },
  { date: "2022-11-24", airline: "AAL", flightNumber: "1595", from: "AUS", to: "DFW", aircraft: "Airbus A319", canceled: false },
  { date: "2022-11-24", airline: "AAL", flightNumber: "1215", from: "DFW", to: "PVR", aircraft: "Boeing 737-800", canceled: false },
  { date: "2022-11-29", airline: "AAL", flightNumber: "353", from: "PVR", to: "DFW", aircraft: "Boeing 737-800", canceled: false },
  { date: "2022-11-29", airline: "AAL", flightNumber: "3424", from: "DFW", to: "AUS", aircraft: "Embraer 175", canceled: false },
  { date: "2022-12-04", airline: "UAL", flightNumber: "210", from: "AUS", to: "ORD", aircraft: "Boeing 737-900ER", canceled: false },
  { date: "2022-12-11", airline: "UAL", flightNumber: "2440", from: "ORD", to: "AUS", aircraft: "Boeing 737 MAX 9", canceled: false },
  { date: "2022-12-18", airline: "UAL", flightNumber: "5359", from: "AUS", to: "DEN", aircraft: "Embraer 175", canceled: false },
  { date: "2023-01-01", airline: "UAL", flightNumber: "1026", from: "DEN", to: "AUS", aircraft: "Airbus A320", canceled: false },
  { date: "2023-01-17", airline: "UAL", flightNumber: "786", from: "AUS", to: "ORD", aircraft: "Airbus A319", canceled: false },
  { date: "2023-03-13", airline: "UAL", flightNumber: "722", from: "ORD", to: "FLL", aircraft: "Boeing 757-300", canceled: false },
  { date: "2023-03-19", airline: "UAL", flightNumber: "1755", from: "FLL", to: "ORD", aircraft: "Boeing 757-300", canceled: false },
  { date: "2023-04-06", airline: "UAL", flightNumber: "1747", from: "ORD", to: "ICT", aircraft: "Airbus A319", canceled: false },
  { date: "2023-04-09", airline: "UAL", flightNumber: "3759", from: "ICT", to: "ORD", aircraft: "Bombardier CRJ200", canceled: false },
  { date: "2023-04-20", airline: "UAL", flightNumber: "2066", from: "ORD", to: "SAN", aircraft: "Boeing 737-900ER", canceled: false },
  { date: "2023-04-23", airline: "UAL", flightNumber: "2325", from: "SAN", to: "ORD", aircraft: "Boeing 737-900ER", canceled: false },
  { date: "2023-04-26", airline: "UAL", flightNumber: "2496", from: "ORD", to: "BNA", aircraft: "Boeing 737-800", canceled: false },
  { date: "2023-04-29", airline: "UAL", flightNumber: "2167", from: "BNA", to: "ORD", aircraft: "Boeing 737-800", canceled: false },
  { date: "2023-05-11", airline: "UAL", flightNumber: "1132", from: "ORD", to: "PHL", aircraft: "Boeing 737-800", canceled: false },
  { date: "2023-05-14", airline: "UAL", flightNumber: "2095", from: "PHL", to: "ORD", aircraft: "Boeing 737-800", canceled: false },
  { date: "2023-05-26", airline: "UAL", flightNumber: "616", from: "ORD", to: "DCA", aircraft: "Boeing 737-800", canceled: false },
  { date: "2023-05-29", airline: "UAL", flightNumber: "1332", from: "DCA", to: "ORD", aircraft: "Airbus A320", canceled: false },
  { date: "2023-06-23", airline: "UAL", flightNumber: "5419", from: "ORD", to: "CVG", aircraft: "Embraer 175", canceled: false },
  { date: "2023-06-25", airline: "UAL", flightNumber: "4188", from: "CVG", to: "ORD", aircraft: "Bombardier CRJ700", canceled: false },
  { date: "2023-07-09", airline: "UAL", flightNumber: "2182", from: "ORD", to: "LGA", aircraft: "Airbus A319", canceled: false },
  { date: "2023-07-21", airline: "UAL", flightNumber: "4809", from: "ORD", to: "ICT", aircraft: "Bombardier CRJ200", canceled: false },
  { date: "2023-07-23", airline: "UAL", flightNumber: "2298", from: "ICT", to: "ORD", aircraft: "Airbus A320", canceled: false },
  { date: "2023-07-23", airline: "UAL", flightNumber: "1968", from: "ORD", to: "LGA", aircraft: "Airbus A319", canceled: false },
  { date: "2023-07-24", airline: "UAL", flightNumber: "2011", from: "LGA", to: "ORD", aircraft: "Airbus A319", canceled: false },
  { date: "2023-07-31", airline: "UAL", flightNumber: "2076", from: "ORD", to: "SEA", aircraft: "Boeing 737-900ER", canceled: false },
  { date: "2023-08-08", airline: "UAL", flightNumber: "1756", from: "SEA", to: "ORD", aircraft: "Boeing 737 MAX 9", canceled: false },
  { date: "2023-08-25", airline: "UAL", flightNumber: "1218", from: "ORD", to: "DEN", aircraft: "Boeing 737-900ER", canceled: false },
  { date: "2023-08-27", airline: "UAL", flightNumber: "1503", from: "DEN", to: "ORD", aircraft: "Boeing 737-900ER", canceled: false },
  { date: "2023-09-01", airline: "UAL", flightNumber: "1401", from: "ORD", to: "PHL", aircraft: "Boeing 737 MAX 8", canceled: false },
  { date: "2023-09-05", airline: "UAL", flightNumber: "2618", from: "PHL", to: "ORD", aircraft: "Boeing 737 MAX 8", canceled: false },
  { date: "2023-09-09", airline: "UAL", flightNumber: "845", from: "ORD", to: "GRU", aircraft: "Boeing 787-10", canceled: false },
  { date: "2023-09-15", airline: "UAL", flightNumber: "844", from: "GRU", to: "ORD", aircraft: "Boeing 787-10", canceled: false },
  { date: "2023-10-18", airline: "UAL", flightNumber: "255", from: "ORD", to: "AUS", aircraft: "Boeing 737 MAX 8", canceled: false },
  { date: "2023-10-20", airline: "UAL", flightNumber: "2041", from: "ORD", to: "SFO", aircraft: "Boeing 757-300", canceled: false },
  { date: "2023-10-20", airline: "UAL", flightNumber: "857", from: "SFO", to: "PVG", aircraft: "Boeing 777-300 ER", canceled: false },
  { date: "2023-10-23", airline: "UAL", flightNumber: "1990", from: "AUS", to: "ORD", aircraft: "Boeing 737-900ER", canceled: false },
  { date: "2023-10-25", airline: "CPA", flightNumber: "369", from: "PVG", to: "HKG", aircraft: "Boeing 777-300", canceled: false },
  { date: "2023-10-29", airline: "CPA", flightNumber: "635", from: "HKG", to: "SIN", aircraft: "Airbus A350-900", canceled: false },
  { date: "2023-11-04", airline: "UAL", flightNumber: "2", from: "SIN", to: "SFO", aircraft: "Boeing 787-9", canceled: false },
  { date: "2023-11-04", airline: "UAL", flightNumber: "2148", from: "SFO", to: "ORD", aircraft: "Boeing 787-10", canceled: false },
  { date: "2023-11-18", airline: "UAL", flightNumber: "4809", from: "ORD", to: "ICT", aircraft: "Bombardier CRJ200", canceled: false },
  { date: "2023-11-27", airline: "UAL", flightNumber: "1190", from: "ICT", to: "ORD", aircraft: "Airbus A319", canceled: false },
  { date: "2023-12-21", airline: "UAL", flightNumber: "5394", from: "ORD", to: "ICT", aircraft: "Bombardier CRJ200", canceled: false },
  { date: "2023-12-30", airline: "UAL", flightNumber: "5246", from: "ICT", to: "ORD", aircraft: "Bombardier CRJ200", canceled: false },
  { date: "2024-01-06", airline: "UAL", flightNumber: "2313", from: "ORD", to: "MIA", aircraft: "Boeing 737-800", canceled: false },
  { date: "2024-01-11", airline: "JBU", flightNumber: "1088", from: "SXM", to: "JFK", aircraft: "Airbus A320", canceled: false },
  { date: "2024-01-14", airline: "UAL", flightNumber: "1273", from: "LGA", to: "ORD", aircraft: "Airbus A319", canceled: false },
  { date: "2024-01-14", airline: "UAL", flightNumber: "1338", from: "LGA", to: "ORD", aircraft: "Airbus A319", canceled: false },
  { date: "2024-02-08", airline: "UAL", flightNumber: "845", from: "ORD", to: "GRU", aircraft: "Boeing 787-10", canceled: false },
  { date: "2024-02-09", airline: "LAN", flightNumber: "3302", from: "GRU", to: "FLN", aircraft: "Airbus A321", canceled: false },
  { date: "2024-02-12", airline: "ARG", flightNumber: "7723", from: "FLN", to: "AEP", aircraft: "Boeing 737-800", canceled: false },
  { date: "2024-02-15", airline: "ARG", flightNumber: "1248", from: "AEP", to: "GRU", aircraft: "Boeing 737-800", canceled: false },
  { date: "2024-02-18", airline: "UAL", flightNumber: "844", from: "GRU", to: "ORD", aircraft: "Boeing 787-10", canceled: false },
  { date: "2024-02-29", airline: "UAL", flightNumber: "602", from: "ORD", to: "PHX", aircraft: "Boeing 737 MAX 9", canceled: false },
  { date: "2024-03-03", airline: "UAL", flightNumber: "533", from: "PHX", to: "ORD", aircraft: "Airbus A321neo", canceled: false },
  { date: "2024-03-10", airline: "UAL", flightNumber: "1775", from: "ORD", to: "FLL", aircraft: "Boeing 737 MAX 9", canceled: false },
  { date: "2024-03-17", airline: "UAL", flightNumber: "1097", from: "FLL", to: "ORD", aircraft: "Boeing 737-900ER", canceled: false },
  { date: "2024-04-24", airline: "UAL", flightNumber: "792", from: "ORD", to: "LGA", aircraft: "Airbus A319", canceled: false },
  { date: "2024-04-26", airline: "UAL", flightNumber: "2485", from: "LGA", to: "ORD", aircraft: "Airbus A319", canceled: false },
  { date: "2024-04-29", airline: "UAL", flightNumber: "5674", from: "ORD", to: "AVL", aircraft: "Bombardier CRJ200", canceled: false },
  { date: "2024-05-02", airline: "UAL", flightNumber: "3415", from: "AVL", to: "ORD", aircraft: "Embraer 175", canceled: false },
  { date: "2024-05-17", airline: "UAL", flightNumber: "2632", from: "ORD", to: "AUS", aircraft: "Airbus A320", canceled: false },
  { date: "2024-05-19", airline: "UAL", flightNumber: "236", from: "AUS", to: "ORD", aircraft: "Boeing 737-700", canceled: false },
  { date: "2024-05-24", airline: "UAL", flightNumber: "4387", from: "ORD", to: "ICT", aircraft: "Bombardier CRJ700", canceled: false },
  { date: "2024-05-27", airline: "UAL", flightNumber: "4194", from: "ICT", to: "ORD", aircraft: "Bombardier CRJ700", canceled: false },
  { date: "2024-06-01", airline: "UAL", flightNumber: "219", from: "ORD", to: "HNL", aircraft: "Boeing 787-10", canceled: false },
  { date: "2024-06-09", airline: "UAL", flightNumber: "218", from: "HNL", to: "ORD", aircraft: "Boeing 787-10", canceled: false },
  { date: "2024-06-22", airline: "UAL", flightNumber: "929", from: "ORD", to: "LHR", aircraft: "Boeing 767-300", canceled: false },
  { date: "2024-07-01", airline: "BAW", flightNumber: "8451", from: "LCY", to: "AMS", aircraft: "Embraer 190", canceled: false },
  { date: "2024-07-03", airline: "KLM", flightNumber: "1365", from: "AMS", to: "BUD", aircraft: "Embraer 195 E2", canceled: false },
  { date: "2024-07-06", airline: "BAW", flightNumber: "869", from: "BUD", to: "LHR", aircraft: "Airbus A319", canceled: false },
  { date: "2024-07-07", airline: "UAL", flightNumber: "959", from: "LHR", to: "ORD", aircraft: "Boeing 767-300", canceled: false },
  { date: "2024-07-19", airline: "UAL", flightNumber: "767", from: "ORD", to: "DEN", aircraft: "Boeing 757-300", canceled: false },
  { date: "2024-10-18", airline: "UAL", flightNumber: "1488", from: "ORD", to: "MCI", aircraft: "Airbus A320", canceled: false },
  { date: "2024-10-20", airline: "UAL", flightNumber: "303", from: "MCI", to: "ORD", aircraft: "Airbus A320", canceled: false },
  { date: "2024-10-23", airline: "AMX", flightNumber: "687", from: "ORD", to: "MEX", aircraft: "Boeing 737 MAX 8", canceled: false },
  { date: "2024-10-28", airline: "AMX", flightNumber: "682", from: "MEX", to: "ORD", aircraft: "Boeing 737-800", canceled: false },
  { date: "2024-11-18", airline: "UAL", flightNumber: "1840", from: "ORD", to: "RSW", aircraft: "Boeing 737-900ER", canceled: false },
  { date: "2024-11-20", airline: "UAL", flightNumber: "2624", from: "RSW", to: "ORD", aircraft: "Boeing 737-900ER", canceled: false },
  { date: "2024-12-21", airline: "UAL", flightNumber: "711", from: "ORD", to: "DEN", aircraft: "Boeing 737-900ER", canceled: false },
  { date: "2024-12-28", airline: "UAL", flightNumber: "2329", from: "DEN", to: "ORD", aircraft: "Boeing 757-300", canceled: false },
  { date: "2025-01-05", airline: "UAL", flightNumber: "4809", from: "ORD", to: "ICT", aircraft: "Embraer 175", canceled: false },
  { date: "2025-01-08", airline: "UAL", flightNumber: "5239", from: "ICT", to: "ORD", aircraft: "Embraer 175", canceled: false },
  { date: "2025-01-09", airline: "UAL", flightNumber: "1681", from: "ORD", to: "LAS", aircraft: "Airbus A321neo", canceled: false },
  { date: "2025-01-11", airline: "UAL", flightNumber: "1006", from: "LAS", to: "ORD", aircraft: "Boeing 737-900ER", canceled: false },
  { date: "2025-02-14", airline: "UAL", flightNumber: "660", from: "ORD", to: "SAN", aircraft: "Airbus A321neo", canceled: false },
  { date: "2025-02-17", airline: "UAL", flightNumber: "714", from: "SAN", to: "ORD", aircraft: "Boeing 737-900ER", canceled: false },
  { date: "2025-02-28", airline: "UAL", flightNumber: "1525", from: "ORD", to: "AUS", aircraft: "Airbus A320", canceled: false },
  { date: "2025-03-02", airline: "UAL", flightNumber: "231", from: "AUS", to: "ORD", aircraft: "Airbus A320", canceled: false },
  { date: "2025-03-09", airline: "UAL", flightNumber: "1775", from: "ORD", to: "FLL", aircraft: "Boeing 777-200 ER", canceled: false },
  { date: "2025-03-15", airline: "UAL", flightNumber: "1755", from: "FLL", to: "ORD", aircraft: "Airbus A321neo", canceled: false },
  { date: "2025-03-29", airline: "UAL", flightNumber: "1258", from: "ORD", to: "UVF", aircraft: "Boeing 737-700", canceled: false },
  { date: "2025-04-05", airline: "UAL", flightNumber: "541", from: "UVF", to: "ORD", aircraft: "Boeing 737-700", canceled: false },
  { date: "2025-04-17", airline: "UAL", flightNumber: "1204", from: "ORD", to: "ABQ", aircraft: "Boeing 737-700", canceled: false },
  { date: "2025-04-20", airline: "UAL", flightNumber: "1269", from: "ABQ", to: "ORD", aircraft: "Boeing 737-700", canceled: false },
  { date: "2025-05-05", airline: "UAL", flightNumber: "1491", from: "ORD", to: "PBI", aircraft: "Boeing 737-800", canceled: false },
  { date: "2025-05-08", airline: "UAL", flightNumber: "2040", from: "PBI", to: "ORD", aircraft: "Boeing 737-800", canceled: false },
  { date: "2025-05-16", airline: "UAL", flightNumber: "786", from: "ICT", to: "ORD", aircraft: "Airbus A319", canceled: false },
  { date: "2025-05-18", airline: "UAL", flightNumber: "4564", from: "ORD", to: "ICT", aircraft: "Bombardier CRJ700", canceled: false },
  { date: "2025-06-19", airline: "UAL", flightNumber: "2137", from: "ORD", to: "SLC", aircraft: "Boeing 737-700", canceled: false },
  { date: "2025-06-22", airline: "UAL", flightNumber: "1382", from: "SLC", to: "ORD", aircraft: "Boeing 737-700", canceled: false },
  { date: "2025-07-03", airline: "UAL", flightNumber: "1811", from: "DEN", to: "ORD", aircraft: "Boeing 777-200 ER", canceled: false },
  { date: "2025-08-29", airline: "UAL", flightNumber: "2225", from: "ORD", to: "AUS", aircraft: "Boeing 737-900ER", canceled: false },
  { date: "2025-09-01", airline: "UAL", flightNumber: "381", from: "AUS", to: "ORD", aircraft: "Boeing 737-900ER", canceled: false },
  { date: "2025-09-12", airline: "UAL", flightNumber: "4809", from: "ORD", to: "ICT", aircraft: "Embraer 175", canceled: false },
  { date: "2025-09-14", airline: "UAL", flightNumber: "4771", from: "ICT", to: "ORD", aircraft: "Embraer 175", canceled: false },
  { date: "2025-09-26", airline: "AAL", flightNumber: "3292", from: "ORD", to: "LAS", aircraft: "Boeing 737 MAX 8", canceled: false },
  { date: "2025-09-28", airline: "UAL", flightNumber: "2102", from: "LAS", to: "ORD", aircraft: "Boeing 737 MAX 9", canceled: false },
  { date: "2025-10-16", airline: "UAL", flightNumber: "1807", from: "ORD", to: "SFO", aircraft: "Airbus A321neo", canceled: false },
  { date: "2025-10-16", airline: "UAL", flightNumber: "2153", from: "SFO", to: "RDM", aircraft: "Boeing 737 MAX 8", canceled: false },
  { date: "2025-10-20", airline: "UAL", flightNumber: "2262", from: "RDM", to: "SFO", aircraft: "Boeing 737-800", canceled: false },
  { date: "2025-10-20", airline: "UAL", flightNumber: "1482", from: "SFO", to: "ORD", aircraft: "Boeing 757-300", canceled: false },
  { date: "2025-11-07", airline: "UAL", flightNumber: "1899", from: "ORD", to: "MSY", aircraft: "Airbus A320", canceled: false },
  { date: "2025-11-10", airline: "UAL", flightNumber: "1495", from: "MSY", to: "ORD", aircraft: "Boeing 737 MAX 8", canceled: false },
  { date: "2025-11-23", airline: "UAL", flightNumber: "4809", from: "ORD", to: "ICT", aircraft: "Embraer 175", canceled: false },
  { date: "2025-11-30", airline: "UAL", flightNumber: "4565", from: "ICT", to: "ORD", aircraft: "Bombardier CRJ700", canceled: false },
  { date: "2025-12-04", airline: "SWA", flightNumber: "417", from: "AUS", to: "MDW", aircraft: "Boeing 737 MAX 8", canceled: false },
  { date: "2025-12-20", airline: "UAL", flightNumber: "791", from: "ORD", to: "DEN", aircraft: "Airbus A321neo", canceled: false },
  { date: "2025-12-28", airline: "UAL", flightNumber: "2865", from: "DEN", to: "ORD", aircraft: "Boeing 737-900ER", canceled: false },
].filter(f => !f.canceled);

// Calculate routes and their frequencies
export function calculateRoutes(): Route[] {
  const routeMap = new Map<string, Route>();
  
  flights.forEach(flight => {
    // Create a normalized route key (alphabetically sorted to treat A->B and B->A as same route)
    const [first, second] = [flight.from, flight.to].sort();
    const key = `${first}-${second}`;
    
    if (routeMap.has(key)) {
      const route = routeMap.get(key)!;
      route.count++;
      route.flights.push(flight);
    } else {
      routeMap.set(key, {
        from: first,
        to: second,
        count: 1,
        flights: [flight],
      });
    }
  });
  
  return Array.from(routeMap.values()).sort((a, b) => b.count - a.count);
}

// Calculate airport statistics
export function calculateAirportStats(): AirportStats[] {
  const airportMap = new Map<string, number>();
  
  flights.forEach(flight => {
    airportMap.set(flight.from, (airportMap.get(flight.from) || 0) + 1);
    airportMap.set(flight.to, (airportMap.get(flight.to) || 0) + 1);
  });
  
  return Array.from(airportMap.entries())
    .filter(([code]) => airportCoordinates[code])
    .map(([code, count]) => ({
      code,
      ...airportCoordinates[code],
      visitCount: count,
    }))
    .sort((a, b) => b.visitCount - a.visitCount);
}

// Get unique countries visited
export function getCountriesVisited(): string[] {
  const countries = new Set<string>();
  const stats = calculateAirportStats();
  stats.forEach(airport => countries.add(airport.country));
  return Array.from(countries);
}

// Get unique aircraft types
export function getUniqueAircraftTypes(): string[] {
  const aircraft = new Set<string>();
  flights.forEach(flight => aircraft.add(flight.aircraft));
  return Array.from(aircraft);
}

// Get unique airlines
export function getUniqueAirlines(): string[] {
  const airlines = new Set<string>();
  flights.forEach(flight => airlines.add(flight.airline));
  return Array.from(airlines);
}

// Get stats summary
export function getFlightStats() {
  const airports = calculateAirportStats();
  const routes = calculateRoutes();
  const countries = getCountriesVisited();
  const aircraftTypes = getUniqueAircraftTypes();
  const airlines = getUniqueAirlines();
  
  return {
    totalFlights: flights.length,
    uniqueAirports: airports.length,
    uniqueCountries: countries.length,
    mostVisitedAirport: airports[0],
    busiestRoute: routes[0],
    yearsOfTravel: new Date().getFullYear() - 2015,
    uniqueAircraftTypes: aircraftTypes.length,
    uniqueAirlines: airlines.length,
    uniqueRoutes: routes.length,
  };
}

