// server/controllers/listingController.js
const pool = require('../config/db');

exports.createListing = async (req, res) => {
  const { title, description, price, category, location } = req.body;
  const userId = req.user.id;

  if (!req.files || req.files.length < 3) {
    return res.status(400).json({ msg: 'At least 3 images are required' });
  }

  try {
    const listingResult = await pool.query(
      `INSERT INTO listings (user_id, title, description, price, category, location)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [userId, title, description, price, category, location]
    );

    const listingId = listingResult.rows[0].id;

    for (const file of req.files) {
      await pool.query(
        `INSERT INTO listing_images (listing_id, image_url)
         VALUES ($1, $2)`,
        [listingId, file.path]
      );
    }

    res.status(201).json({ msg: 'Listing created', listingId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error creating listing' });
  }
};

exports.getAllListings = async (req, res) => {
  try {
    const listingsResult = await pool.query(`
      SELECT l.*, json_agg(li.*) AS images
      FROM listings l
      LEFT JOIN listing_images li ON l.id = li.listing_id
      GROUP BY l.id
      ORDER BY l.created_at DESC
    `);

    res.json(listingsResult.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error fetching listings' });
  }
};

exports.getListingById = async (req, res) => {
  const listingId = req.params.id;
  try {
    const result = await pool.query(`
      SELECT l.*, json_agg(li.*) AS images
      FROM listings l
      LEFT JOIN listing_images li ON l.id = li.listing_id
      WHERE l.id = $1
      GROUP BY l.id
    `, [listingId]);

    if (result.rows.length === 0) return res.status(404).json({ msg: 'Listing not found' });

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error fetching listing' });
  }
};
