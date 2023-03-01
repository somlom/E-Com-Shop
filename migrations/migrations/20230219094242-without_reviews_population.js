module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});

    const products = await db.collection('products').find()
    const reviews = await db.collection('reviews').find()

    reviews.forEach(async (element) => await products.updateOne({ id: element.product }, { reviews: ["63f0f7d0e6d42909fc9bb7cc"] }));
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
