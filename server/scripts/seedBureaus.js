const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Bureau = require('../models/Bureau');
require('dotenv').config();

// Add password for each bureau
const bureaus = [
  { en: "Economic Statistics Deputy Director General", am: "የኢኮኖሚ ስታቲክስ ዘርፍ ምክትል ዋና ዳይሬክተር", key: "economic", password: "economic123" },
  { en: "Agriculture Statistics CEO", am: "የግብርና ስታቲክስ መሪ ሥራ አስፈፃሚ", key: "agriculture", password: "agriculture123" },
  { en: "Business Statistics CEO", am: "የቢዝነስ ስታቲክስ መሪ ሣራ አስፈፃሚ", key: "business", password: "business123" },
  { en: "Price Statistics CEO", am: "የዋጋ ስታቲስቲክስ መሪ ስራ አስፈፃሚ", key: "price", password: "price123" },
  { en: "Geospatial Statistics CEO", am: "የጂኦስፓሻል ስታቲስቲክስ መሪ ሣራ አስፈፃሚ", key: "geo", password: "geo123" },
  { en: "Statistical Data Dissemination CEO", am: "የስታቲሲቲካል መረጃ ስርጭት እና መዳረሻ መሪ ሣራ አስፈፃሚ", key: "dissemination", password: "dissemination123" },
  { en: "Statistical System Development and Methodology Deputy Director General", am: "የስታቲስቲካል ስርዓት ልማት እና ዘዴ ምክትል ዋና ዳይሬክተር", key: "system", password: "system123" },
  { en: "HouseHold Budget and Labour Statistics CEO", am: "የቤተሰብ በጀት እና የጉልበት ስታቲስቲክስ ዋና ሣራ አስፈፃሚ", key: "household", password: "household123" },
  { en: "Director General", am: "ዋና ዳይሬክተር", key: "director", password: "director123" },
  { en: "Statistical Surveys Methodology CEO", am: "የስታቲስቲካል ጥናቶች ዘዴ ዋና ሣራ አስፈፃሚ", key: "surveys", password: "surveys123" },
  { en: "Branch Offices and Operation Coordination CEO", am: "የቅርንጫፍ ቢሮዎች እና ኦፕሬሽን መሪ ሣራ አስፈፃሚ", key: "branches", password: "branches123" },
  { en: "Administrative Data Harmonization Standard and Quality CEO", am: "የአስተዳደር መረጃ ቅንጅት ስታንዳርድ እና ጥናት መሪ ሣራ አስፈፃሚ", key: "admin", password: "admin123" },
  { en: "Statistical Study Research and Training CEO", am: "የስታቲክስ ጥናት ምርምር እና ስልጠና መሪ ሣራ አስፈፃሚ", key: "research", password: "research123" },
  { en: "Information System Technology and Infrastructure Development CEO", am: "የመረጃ ስርዓት ቴክኖሎጂ እና መሠረተ ልማት ግንባታ መሪ ሣራ አስፈፃሚ", key: "it", password: "it123" },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/suggestbox");
    console.log("✅ Connected to MongoDB...");

    await Bureau.deleteMany();
    console.log("🗑️ Old bureaus cleared");

    for (let b of bureaus) {
      const hashed = await bcrypt.hash(b.password, 10);
      await Bureau.create({
        name_en: b.en,
        name_am: b.am,
        key: b.key,
        email: `${b.key}@ethiostat.gov.et`,
        passwordHash: hashed
      });
      console.log(`✔ Created: ${b.key}@ethiostat.gov.et | password: ${b.password}`);
    }

    console.log("🎉 Bureaus seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding bureaus:", err);
    process.exit(1);
  }
})();
