import mongoose, { Document, Schema } from "mongoose";

interface IMovie extends Document {
  _id: string;
  title: string;
  url: string;
  image: string;
  year: string;
  tags: string[];
  description: string;
}

const movieSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  image: { type: String, required: true },
  year: { type: String, required: true },
  tags: { type: Array, required: true },
  description: { type: String, required: true },
});

const Movie = mongoose.model<IMovie>("Movie", movieSchema);

export default Movie;
export type { IMovie };
