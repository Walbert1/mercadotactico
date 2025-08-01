// client/src/services/listingService.js
import axios from './axios';

export const getAllListings = () => axios.get('/listings');
