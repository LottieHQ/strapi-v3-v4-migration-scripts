const { dbV3, dbV4 } = require("../config/database");
const { BATCH_SIZE } = require("./helpers/constants");
const { migrate } = require("./helpers/migrate");

async function migrateTables() {
  console.log("Migrate webhooks");

  const source = "strapi_webhooks";
  const destination = "strapi_webhooks";

  await migrate(source, destination);
  await migrate("listings", "listings_partner_brand_links", (listing) => ({
    listing_id: listing.id,
    partner_brands_id: listing.partner_brand,
  }));
}

module.exports = {
  migrateWebhooks: {
    processedTables: ["strapi_webhooks"],
    migrateTables,
  },
};
