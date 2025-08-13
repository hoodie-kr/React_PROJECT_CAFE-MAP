import client from './client'
export const searchCafes=p=>client.get('/cafes/search',{params:p})
export const nearbyCafes=(lat,lng)=>client.get('/cafes/nearby',{params:{lat,lng}})
export const fetchRankings=(type='sales')=>client.get('/rankings',{params:{type}})
