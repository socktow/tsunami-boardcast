import mongoose from "mongoose"

const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  image: { type: String, default: null },
})

const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    color: { type: String, default: "#00c2ff" },
    logo: { type: String, default: null },
    lineup: { type: [PlayerSchema], default: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: "teams" }
)

export default mongoose.models.Team || mongoose.model("Team", TeamSchema)
