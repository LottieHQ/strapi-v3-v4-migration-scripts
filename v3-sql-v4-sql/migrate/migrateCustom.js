// Tables that should not be proccessed later
const processedTables = [];

const fs = require("fs");
const path = require("path");

const customMigrations = [];
const { migrate } = require("./helpers/migrate");

const MIGRATION_FOLDERS = __dirname + "/../customMigrations";
const files = fs.readdirSync(MIGRATION_FOLDERS);

files.forEach((file) => {
  const extension = path.extname(file);

  if (extension === ".js" && file !== "import.js") {
    customMigrations.push({
      name: file,
      ...require(path.join(MIGRATION_FOLDERS, file)),
    });
  }
});

// Custom migration function, handles DB reads and writes
async function migrateTables() {
  for (const customMigration of customMigrations) {
    console.log("Migration custom ", customMigration.name);

    await customMigration.migrateTables();
    processedTables.push(...customMigration.processedTables);
  }

  // console.log('migrating listing page partner brands')
  // await migrate("listings", "listings_partner_brand_links", (listing) => ({
  //   listing_id: listing.id,
  //   partner_brands_id: listing.partner_brand,
  // }));

  // console.log('migrating content page categories')
  // await migrate("content_pages", "content_pages_content_page_category_links", (content_page) => ({
  //   content_page_id: content_page.id,
  //   content_page_category_id: content_page.content_page_category,
  // }));

  // console.log('migrating content page authors')
  // await migrate("content_pages", "content_pages_content_author_links", (content_page) => ({
  //   content_page_id: content_page.id,
  //   content_author_id: content_page.content_author,
  // }));

  // console.log('migrating locations_example_care_home_1_links')
  // await migrate("locations", "locations_example_care_home_1_links", (location) => ({
  //   location_id: location.id,
  //   listing_id: location.example_care_home_1,
  // }));

  // console.log('migrating locations_example_care_home_2_links')
  // await migrate("locations", "locations_example_care_home_2_links", (location) => ({
  //   location_id: location.id,
  //   listing_id: location.example_care_home_2,
  // }));

  // console.log('migrating partner_brands_users_permissions_users_links')
  // await migrate("partner_brands_users_permissions_users__users_partner_brands", "partner_brands_users_permissions_users_links", (relation) => ({
  //   partner_brands_id: relation['partner-brand_id'],
  //   user_id: relation.user_id,
  // }));

  // console.log('migrating retirement_listings_care_home_listing_links')
  // await migrate("retirement_listings", "retirement_listings_care_home_listing_links", (retirement_listing) => ({
  //   retirement_listing_id: retirement_listing.id,
  //   listing_id: retirement_listing.care_home_listing,
  // }));

  // console.log('migrating listings_location_links')
  // await migrate("listings", "listings_location_links", (listing) => ({
  //   listing_id: listing.id,
  //   location_id: listing.location,
  // }));

  // console.log('migrating retirement_listings_partner_brand_links')
  // await migrate("retirement_listings", "retirement_listings_partner_brand_links", (retirement_listing) => ({
  //   retirement_listing_id: retirement_listing.id,
  //   partner_brands_id: retirement_listing.partner_brand,
  // }));
}

const migrateCustom = {
  processedTables,
  migrateTables,
};

module.exports = {
  migrateCustom,
};
