const axios = require('axios');
axios.post('http://localhost:8080/jugadores/login', { username: 'admin', password: 'admin123' })
.then(res => { console.log('status:', res.status); console.log('data:', res.data); })
.catch(e => console.error(e.response ? e.response.data : e.message));
