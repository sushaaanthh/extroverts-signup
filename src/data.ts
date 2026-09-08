export interface LocationData {
  [state: string]: {
    cities: string[];
    colleges: { [city: string]: string[] };
  };
}

export const locationData: LocationData = {
  Karnataka: {
    cities: ['Bengaluru', 'Mysuru', 'Hubli', 'Mangaluru', 'Belagavi'],
    colleges: {
      Bengaluru: [
        'Indian Institute of Science (IISc)',
        'IIM Bengaluru',
        'Christ University',
        'RV College of Engineering',
        'PES University',
        'BMS College of Engineering',
        'Bangalore University',
        'Manipal Academy of Higher Education',
        'Other',
      ],
      Mysuru: [
        'University of Mysore',
        'NIE Mysuru',
        'JSS Science and Technology University',
        'Vidyavardhaka College of Engineering',
        'Other',
      ],
      Hubli: [
        'KLE University',
        'BVB College of Engineering and Technology',
        'Karnataka University',
        'Other',
      ],
      Mangaluru: [
        'NITK Surathkal',
        'Manipal Institute of Technology',
        'St. Aloysius College',
        'Other',
      ],
      Belagavi: [
        'Visvesvaraya Technological University',
        'KLE Dr. MS Sheshgiri College',
        'Other',
      ],
    },
  },
  Telangana: {
    cities: ['Hyderabad', 'Warangal', 'Karimnagar', 'Nizamabad'],
    colleges: {
      Hyderabad: [
        'IIIT Hyderabad',
        'University of Hyderabad',
        'BITS Pilani Hyderabad Campus',
        'Osmania University',
        'JNTU Hyderabad',
        'Hyderabad Central University',
        'Other',
      ],
      Warangal: [
        'NIT Warangal',
        'Kakatiya University',
        'JNTU Warangal',
        'Other',
      ],
      Karimnagar: [
        'Satavahana University',
        'Kakatiya Institute of Technology and Science',
        'Other',
      ],
      Nizamabad: [
        'Government Degree College Nizamabad',
        'Telangana University',
        'Other',
      ],
    },
  },
  Maharashtra: {
    cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
    colleges: {
      Mumbai: [
        'IIT Bombay',
        'University of Mumbai',
        'NMIMS University',
        'Tata Institute of Social Sciences',
        'St. Xavier\'s College',
        'VJTI Mumbai',
        'Other',
      ],
      Pune: [
        'Savitribai Phule Pune University',
        'Symbiosis International University',
        'COEP Technological University',
        'Fergusson College',
        'MIT World Peace University',
        'Other',
      ],
      Nagpur: [
        'VNIT Nagpur',
        'Rashtrasant Tukadoji Maharaj Nagpur University',
        'Symbiosis Institute Nagpur',
        'Other',
      ],
      Nashik: [
        'Sandip University',
        'K. K. Wagh Institute of Engineering',
        'Nashik Engineering Cluster',
        'Other',
      ],
      Aurangabad: [
        'Dr. Babasaheb Ambedkar Marathwada University',
        'MIT Aurangabad',
        'MGM University',
        'Other',
      ],
    },
  },
  Delhi: {
    cities: ['New Delhi', 'South Delhi', 'West Delhi', 'North Delhi', 'East Delhi'],
    colleges: {
      'New Delhi': [
        'IIT Delhi',
        'Jawaharlal Nehru University',
        'AIIMS New Delhi',
        'Jamia Millia Islamia',
        'Delhi Technological University',
        'Other',
      ],
      'South Delhi': [
        'South Campus — Delhi University',
        'Ambedkar University Delhi',
        'IP University South',
        'Other',
      ],
      'West Delhi': [
        'Guru Gobind Singh Indraprastha University',
        'Delhi Institute of Technology and Management',
        'Other',
      ],
      'North Delhi': [
        'North Campus — Delhi University',
        'Hindu College',
        'Hansraj College',
        'Miranda House',
        'Other',
      ],
      'East Delhi': [
        'Delhi College of Engineering (East)',
        'Other',
      ],
    },
  },
  'Tamil Nadu': {
    cities: ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Trichy'],
    colleges: {
      Chennai: [
        'IIT Madras',
        'Anna University',
        'Loyola College',
        'Vellore Institute of Technology (Chennai)',
        'SRM Institute of Science and Technology',
        'Other',
      ],
      Coimbatore: [
        'PSG College of Technology',
        'Amrita School of Engineering',
        'CIT Coimbatore',
        'Bharathiar University',
        'Other',
      ],
      Madurai: [
        'Madurai Kamaraj University',
        'NIT Tiruchirappalli (nearby)',
        'Thiagarajar College of Engineering',
        'Other',
      ],
      Salem: [
        'Periyar University',
        'SSM College of Engineering',
        'Other',
      ],
      Trichy: [
        'NIT Tiruchirappalli',
        'Bharathidasan University',
        'Bishop Heber College',
        'Other',
      ],
    },
  },
  'Andhra Pradesh': {
    cities: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati'],
    colleges: {
      Visakhapatnam: [
        'GITAM University',
        'Andhra University',
        'NIT Warangal (nearby)',
        'Other',
      ],
      Vijayawada: [
        'SRM University AP',
        'K L University',
        'Other',
      ],
      Guntur: [
        'Acharya Nagarjuna University',
        'Bapatla Engineering College',
        'Other',
      ],
      Tirupati: [
        'Sri Venkateswara University',
        'IIIT Sri City',
        'Other',
      ],
    },
  },
  'West Bengal': {
    cities: ['Kolkata', 'Howrah', 'Siliguri', 'Durgapur'],
    colleges: {
      Kolkata: [
        'IIT Kharagpur (nearby)',
        'Jadavpur University',
        'University of Calcutta',
        'Presidency University',
        'St. Xavier\'s College Kolkata',
        'Other',
      ],
      Howrah: [
        'IIEST Shibpur',
        'Other',
      ],
      Siliguri: [
        'North Bengal University',
        'Other',
      ],
      Durgapur: [
        'NIT Durgapur',
        'BIT Mesra (nearby)',
        'Other',
      ],
    },
  },
  Rajasthan: {
    cities: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota'],
    colleges: {
      Jaipur: [
        'IIT Jodhpur',
        'Malaviya National Institute of Technology',
        'University of Rajasthan',
        'BITS Pilani (nearby)',
        'Manipal University Jaipur',
        'Other',
      ],
      Jodhpur: [
        'IIT Jodhpur',
        'Jai Narain Vyas University',
        'Other',
      ],
      Udaipur: [
        'Mohanlal Sukhadia University',
        'Pacific University',
        'Other',
      ],
      Kota: [
        'Government Engineering College Kota',
        'University of Kota',
        'Other',
      ],
    },
  },
};

export const states = Object.keys(locationData).sort();

export function getCities(state: string): string[] {
  return locationData[state]?.cities ?? [];
}

export function getColleges(state: string, city: string): string[] {
  return locationData[state]?.colleges[city] ?? ['Other'];
}
