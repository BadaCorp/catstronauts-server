import { Author, Module, Root, Track } from "./types/types";

interface TrackSchema
  extends Omit<Track, "modules" | "authorId" | "topic" | "createAt"> {
  author: Author;
  modules: Module[];
}

interface AuthorSchema extends Author {}

interface ModuleSchema
  extends Omit<
    Module,
    "trackId" | "authorId" | "topic" | "content" | "videoUrl"
  > {}

const resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate
    // the homepage grid of our web client
    tracksForHome: async (
      _: Root,
      __: Root,
      { dataSources }: any
    ): Promise<TrackSchema[]> => {
      return dataSources.trackAPI.getTracksForHome();
    },
    // get a single track by id, for the Track page
    track: async (
      _: Root,
      { id }: Track,
      { dataSources }: any
    ): Promise<TrackSchema> => {
      return dataSources.trackAPI.getTrack(id);
    },
  },
  Track: {
    author: async (
      { authorId }: Track,
      _: Root,
      { dataSources }: any
    ): Promise<AuthorSchema> => {
      return dataSources.trackAPI.getAuthor(authorId);
    },
    modules: async (
      { id }: Track,
      _: Root,
      { dataSources }: any
    ): Promise<ModuleSchema[]> => {
      return dataSources.trackAPI.getTrackModules(id);
    },
  },
};

export default resolvers;
