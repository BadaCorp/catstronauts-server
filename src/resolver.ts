import { Author, Root, Track } from "./types/types";

const resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate
    // the homepage grid of our web client
    tracksForHome: async (
      _: Root,
      __: Root,
      { dataSources }: any
    ): Promise<Track[]> => {
      return dataSources.trackAPI.getTracksForHome();
    },
    // get a single track by id, for the Track page
    track: async (
      _: Root,
      { id }: Track,
      { dataSources }: any
    ): Promise<Track> => {
      return dataSources.trackAPI.getTrack(id);
    },
  },
  Track: {
    author: async (
      { authorId }: Track,
      _: Root,
      { dataSources }: any
    ): Promise<Author> => {
      return dataSources.trackAPI.getAuthor(authorId);
    },
  },
};

export default resolvers;
